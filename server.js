require('dotenv').config()
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

const userRoutes = require('./routes/userRoutes')
const homeRoutes = require('./routes/homeRoutes')
const aboutRoutes = require('./routes/aboutRoutes')
const constitutionRoutes = require('./routes/constitutionRoutes')
const manifestoRoutes = require('./routes/manifestoRoutes')
const manifestoPostRoutes = require('./routes/manifestoPostRoutes')
const { header: newsHeaderRoutes, posts: newsPostRoutes } = require('./routes/newsRoutes')
const { header: roadConstructionHeaderRoutes, posts: roadConstructionPostRoutes } = require('./routes/roadConstructionRoutes')
const membershipRoutes = require('./routes/membershipRoutes')
const liberianConstitutionRoutes = require('./routes/liberianConstitutionRoutes')
const teamRoutes = require('./routes/teamRoutes')
const galleryRoutes = require('./routes/galleryRoutes')
const videoGalleryRoutes = require('./routes/videoGalleryRoutes')
const contactRoutes = require('./routes/contactRoutes')

connectDB()

const app = express()

app.use(
  cors({
    origin(origin, callback) {
      return callback(null, true)
    },
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS']
  })
)

app.set('trust proxy', 1)
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

const sessionSecret = process.env.SESSION_SECRET || 'default_secret'
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI, collectionName: 'sessions' }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  }
}))

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'TUP CMS Backend API' })
})

// API Routes
app.use('/api/users', userRoutes)
app.use('/api/home', homeRoutes)
app.use('/api/about', aboutRoutes)
app.use('/api/constitution', constitutionRoutes)
app.use('/api/manifesto', manifestoRoutes)
app.use('/api/manifesto-posts', manifestoPostRoutes)
app.use('/api/news', newsHeaderRoutes)
app.use('/api/news-posts', newsPostRoutes)
app.use('/api/road-construction', roadConstructionHeaderRoutes)
app.use('/api/road-construction-posts', roadConstructionPostRoutes)
app.use('/api/membership', membershipRoutes)
app.use('/api/liberian-constitution', liberianConstitutionRoutes)
app.use('/api/team', teamRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/videos', videoGalleryRoutes)
app.use('/api/contact', contactRoutes)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
