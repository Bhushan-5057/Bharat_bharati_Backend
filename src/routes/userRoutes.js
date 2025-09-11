import express from 'express';
import { login, logout, createUser, updateUser, getUser, getAllUsers, updateUserStatus } from '../controllers/userController.js'
import { loginValidation, createUserValidation, updateUserValidation } from '../validations/userValidation.js'
import { authenticateToken } from '../middleware/authorization.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = express.Router();

// Public routes
router.post('/login', loginValidation, validateRequest, login);
router.post('/logout', logout);

//admin routes
router.get('/get/:id', getUser);
router.post('/create', createUserValidation, validateRequest, authenticateToken, createUser);
router.put('/update/:id', updateUserValidation, validateRequest, authenticateToken, updateUser);
router.get('/get-all',getAllUsers);
router.put('/update-status/:id', authenticateToken, updateUserStatus);

export default router