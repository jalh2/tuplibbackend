const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })
const mongoose = require('mongoose')
const { hashPassword } = require('../utils/encryption')
const User = require('../models/userModel')
const HomeContent = require('../models/homeModel')
const AboutContent = require('../models/aboutModel')
const ConstitutionContent = require('../models/constitutionModel')
const ManifestoContent = require('../models/manifestoModel')
const NewsHeader = require('../models/newsHeaderModel')
const NewsPost = require('../models/newsPostModel')
const TeamPage = require('../models/teamPageModel')
const TeamMember = require('../models/teamMemberModel')
const GalleryItem = require('../models/galleryItemModel')
const ContactPage = require('../models/contactPageModel')

const seed = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) throw new Error('MONGO_URI is not defined');
    
    await mongoose.connect(mongoUri)
    console.log('Connected to DB for seeding...')

    // Clear existing data
    await User.deleteMany({})
    await HomeContent.deleteMany({})
    await AboutContent.deleteMany({})
    await ConstitutionContent.deleteMany({})
    await ManifestoContent.deleteMany({})
    await NewsHeader.deleteMany({})
    await NewsPost.deleteMany({})
    await TeamPage.deleteMany({})
    await TeamMember.deleteMany({})
    await GalleryItem.deleteMany({})
    await ContactPage.deleteMany({})
    
    console.log('Cleared existing data.')

    // 1. Create Super Admin
    const admin = await User.create({
      username: 'superadmin',
      password: hashPassword('password123'),
      role: 'superAdmin',
      isActive: true
    })
    console.log(`Super Admin created: ${admin.username}`)

    // 2. Home Page
    await HomeContent.create({
        headerTitle: 'True United Party',
        hero: {
            title: 'True United Party',
            subtitle: 'Fraternal Love, Understanding, and Mutual Respect',
            images: [], // Add base64 images here
            overlayColor: 'rgba(0, 0, 0, 0.5)'
        },
        snippets: {
            about: 'We are dedicated to reconciling the body politic for the creation of a democratic society.',
            news: 'Stay informed about our latest activities and press releases.',
            manifesto: 'Explore our comprehensive plan for the future of Liberia.',
            gallery: 'Witness our work and engagement with the community.'
        },
        contactInfo: {
            address: 'Monrovia, Liberia',
            email: 'info@tup.org',
            phone: '+231 77 000 0000'
        },
        footer: {
            address: 'Monrovia, Liberia',
            email: 'info@tup.org',
            phone: '+231 77 000 0000'
        }
    })
    console.log('Home Content seeded')

    // 3. About Page
    await AboutContent.create({
        bio: 'The True United Party (TUP) is a political institution in Liberia dedicated to fostering national unity, democracy, and the rule of law. Our foundation is built on the principles of fraternal love, mutual respect, and understanding among all Liberians.',
        mission: 'To reconcile the body politic for the creation of a democratic society steadfast in the rule of law.',
        vision: 'A united, prosperous, and democratic Liberia where every citizen is treated with dignity and respect.',
        goals: '1. Promote national reconciliation.\n2. Uphold the rule of law.\n3. Foster economic growth and development.\n4. Ensure social justice and equality for all.',
        additionalSections: [
            {
                title: 'Our History',
                content: 'Founded with the vision of a better Liberia...',
                type: 'text'
            }
        ]
    })
    console.log('About Content seeded')

    // 4. Constitution
    await ConstitutionContent.create({
        sections: [
            { title: 'Preamble', content: 'We, the members of the True United Party, dedicated to the principles of fraternal love, understanding, and mutual respect...' },
            { title: 'Article I: Name and Motto', content: 'The name of the party shall be the True United Party (TUP)...' },
            { title: 'Article II: Aims and Objectives', content: 'The objectives of the party shall include the promotion of democracy, rule of law, and national unity...' },
            { title: 'Article III: Membership', content: 'Membership is open to all Liberians who subscribe to the ideology of the party...' },
            { title: 'Article IV: Organizational Structure', content: 'The party shall be organized at the National, County, District, and Local levels...' },
            { title: 'Article V: The National Convention', content: 'The National Convention shall be the highest decision-making body of the party...' },
            { title: 'Article VI: The National Executive Committee', content: 'The NEC shall be responsible for the day-to-day administration of the party...' },
            { title: 'Article VII: Elections', content: 'All party officials shall be elected through a democratic process...' },
            { title: 'Article VIII: Discipline and Grievance', content: 'The party shall maintain a mechanism for resolving disputes and disciplining members...' },
            { title: 'Article IX: Finance', content: 'The funds of the party shall be derived from membership dues, donations, and fundraising activities...' },
            { title: 'Article X: Amendments', content: 'This Constitution may be amended by a two-thirds majority vote at the National Convention...' }
        ]
    })
    console.log('Constitution seeded')

    // 5. Manifesto
    await ManifestoContent.create({
        sections: [
            { title: 'Foreword', content: 'Our vision for a new Liberia...' },
            { title: '1. Economic Revitalization', content: 'We plan to build a robust economy based on private sector growth, job creation, and sustainable development...' },
            { title: '2. Agriculture and Food Security', content: 'We will invest in modern farming techniques to ensure Liberia feeds itself...' },
            { title: '3. Education and Training', content: 'Education is the key to our future. We commit to free, quality primary and secondary education...' },
            { title: '4. Healthcare Delivery', content: 'We will ensure every Liberian has access to affordable and quality healthcare...' },
            { title: '5. Infrastructure Development', content: 'Connecting our country through roads, bridges, energy, and technology...' },
            { title: '6. Rule of Law and Justice', content: 'We will strengthen the judiciary and ensure justice for all...' },
            { title: '7. Women and Youth Empowerment', content: 'Creating opportunities for women and youth to participate fully in national development...' },
            { title: '8. Foreign Policy', content: 'Maintaining strong relationships with our neighbors and international partners...' },
            { title: '9. National Security', content: 'Ensuring the safety and security of all citizens...' },
            { title: 'Conclusion', content: 'Join us in building the Liberia we deserve.' }
        ]
    })
    console.log('Manifesto seeded')

    // 6. News
    await NewsHeader.create({
        title: 'News & Media',
        description: 'Latest updates from TUP'
    })
    await NewsPost.create({
        title: 'Party Launch Event',
        description: 'The True United Party successfully launched its campaign...',
        publishedAt: new Date()
    })
    console.log('News seeded')

    // 7. Team
    await TeamPage.create({
        description: 'Meet the dedicated leadership of TUP'
    })
    await TeamMember.create({
        name: 'John Doe',
        role: 'Party Chairman',
        bio: 'A dedicated servant of the people with over 20 years of experience...'
    })
    console.log('Team seeded')

    // 8. Gallery
    // No items by default, need images
    console.log('Gallery seeded (empty)')

    // 9. Contact
    await ContactPage.create({
        title: 'Contact Us',
        description: 'We want to hear from you',
        address: 'Monrovia, Liberia',
        email: 'info@tup.org',
        phone: '+231 77 000 0000'
    })
    console.log('Contact seeded')
    
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
    console.log('Disconnected from DB.')
  }
}

if (require.main === module) {
  seed()
}
