const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { MongoClient } = require('mongodb');

const sourceUri = process.env.MONGO_URI;
const destUri = process.env.MONGO_URI2;

if (!sourceUri) {
    console.error('Error: MONGO_URI is not defined in .env');
    process.exit(1);
}

if (!destUri) {
    console.error('Error: MONGO_URI2 is not defined in .env');
    process.exit(1);
}

if (destUri.includes('<db_password>')) {
    console.error('Error: MONGO_URI2 contains placeholder <db_password>. Please update your .env file with the actual password.');
    process.exit(1);
}

const copyDatabase = async () => {
    let sourceClient;
    let destClient;

    try {
        console.log('Connecting to source database...');
        sourceClient = new MongoClient(sourceUri);
        await sourceClient.connect();
        const sourceDb = sourceClient.db();
        console.log(`Connected to source: ${sourceDb.databaseName}`);

        console.log('Connecting to destination database...');
        destClient = new MongoClient(destUri);
        await destClient.connect();
        const destDb = destClient.db();
        console.log(`Connected to destination: ${destDb.databaseName}`);

        // Get all collections from source
        const collections = await sourceDb.listCollections().toArray();
        console.log(`Found ${collections.length} collections to copy.`);

        for (const collectionInfo of collections) {
            const colName = collectionInfo.name;
            
            // Skip system collections
            if (colName.startsWith('system.')) continue;

            console.log(`\nProcessing collection: ${colName}`);
            
            const sourceCollection = sourceDb.collection(colName);
            const destCollection = destDb.collection(colName);

            const documents = await sourceCollection.find({}).toArray();
            
            if (documents.length === 0) {
                console.log(`  - No documents found. Skipping.`);
                continue;
            }

            console.log(`  - Found ${documents.length} documents. Copying...`);

            // Use ordered: false to continue inserting even if some fail (e.g. duplicates)
            try {
                const result = await destCollection.insertMany(documents, { ordered: false });
                console.log(`  - Successfully inserted ${result.insertedCount} documents.`);
            } catch (err) {
                if (err.code === 11000) {
                     // Duplicate key error
                     console.log(`  - Warning: Some documents were duplicates and were skipped. (${err.writeErrors?.length || 'Unknown'} skipped)`);
                     if (err.insertedCount) {
                         console.log(`  - Successfully inserted ${err.insertedCount} new documents.`);
                     }
                } else {
                    console.error(`  - Error copying collection ${colName}:`, err.message);
                }
            }
        }

        console.log('\nDatabase copy completed successfully!');

    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        if (sourceClient) await sourceClient.close();
        if (destClient) await destClient.close();
    }
};

copyDatabase();
