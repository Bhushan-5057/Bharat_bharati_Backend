import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import cors from 'cors'
import sequelize from './src/config/db.js'
import router from './src/routes/index.js'
import User from './src/models/User.model.js'
import bcrypt from 'bcryptjs'
import { errorHandler } from './src/middleware/errorHandler.js'
import { setupSwagger } from './src/config/swagger.js'

dotenv.config()
const app = express()

// Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));

// Security middleware
app.use(helmet())

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3002',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.options(/.*/, cors());

// Swagger API docs
setupSwagger(app)

// Root for the router file
app.use('/api', router)

// Error handling middleware
app.use(errorHandler)

const PORT = process.env.PORT || 3001

// Database connection and server startup
const startServer = async () => {
    try {
        await sequelize.authenticate()
        console.log('Database connected successfully')

        await sequelize.sync({ force: false })
        console.log('Database synchronized successfully')

        // Create default admin user
        const existingAdmin = await User.findOne({ where: { email: process.env.ADMIN_EMAIL } })
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 6)
            await User.create({ name: 'Avinash Patil', email: process.env.ADMIN_EMAIL, password: hashedPassword, created_by: 'system' })
            console.log('Default admin user created')
        }

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

startServer()

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully')
    await sequelize.close()
    process.exit(0)
})

process.on('SIGINT', async () => {
    console.log('SIGINT received, shutting down gracefully')
    await sequelize.close()
    process.exit(0)
})
