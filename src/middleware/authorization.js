import jwt from 'jsonwebtoken'
import { AppError } from './errorHandler.js'
import User from '../models/User.model.js'

export const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

        if (!token) {
            throw new AppError('Access token required', 401)
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Check if user still exists
        const user = await User.findByPk(decoded.id)
        if (!user) {
            throw new AppError('User no longer exists', 401)
        }
        req.user = user
        next()
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            next(new AppError('Invalid token', 401))
        } else if (error.name === 'TokenExpiredError') {
            next(new AppError('Token expired', 401))
        } else {
            next(error)
        }
    }
}
