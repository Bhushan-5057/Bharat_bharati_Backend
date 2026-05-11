import bcrypt from 'bcryptjs'
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken'
import User  from '../models/User.model.js'
import { AppError } from '../middleware/errorHandler.js'

//User login 
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body; 

    // Find user
    const user = await User.findOne({where: { email }});
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }  

    if (user.status === 'Deactive' || user.status === 'Deleted') {
      throw new AppError('Your account is not active. Contact admin.', 403);
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new AppError('Invalid credentials', 401)
    }
    // Generate token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION || '7d' }
    ) 

    const plainUser = user.get({ plain: true });
    delete plainUser.password;

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user:plainUser
      }
    })
  } catch (error) {
    next(error)
  };
}

//User logout
export const logout = (req, res, next) => {

  return res.status(200).json({ msg: 'Logout successful. Please delete token on client.' });
};

//Create User
export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const createdBy = req.user.name;

    // Check if user with email already exists and is active
    const existingUser = await User.findOne({where:{email}});
    if (existingUser) {
      throw new AppError('User with this email already exists', 400);
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 6);

    // Create user record
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      created_by: createdBy.toString(),
      isActive: true,
    });

    return res.status(201).json({
      message: 'User created successfully',
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

// get user by Id
export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where:{id , status: { [Op.ne]: "Deleted" } }});
    if (!user) {
      throw new AppError("User not found or status 'Deleted'",404);
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

//Get all user
export const getAllUsers = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      sortBy = 'createdAt',
      order = 'DESC',
    } = req.query;

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const offset = (pageNumber - 1) * limitNumber;

    const sortOrder = ['ASC', 'DESC'].includes(order.toUpperCase())
      ? order.toUpperCase()
      : 'DESC';

    const where = {
      status: { [Op.ne]: 'Deleted' },
      ...(search && {
        name: {
          [Op.like]: `%${search}%`,
        },
      }),
    };

    const { count, rows } = await User.findAndCountAll({
      where,
      offset,
      limit: limitNumber,
      order: [[sortBy, sortOrder]],
      attributes: { exclude: ['password'] },
    });

    return res.status(200).json({
      total: count,
      page: pageNumber,
      totalPages: Math.ceil(count / limitNumber),
      data: rows.map((row) => row.get({ plain: true })),
    });
  } catch (error) {
    next(error);
  }
};

//update User
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, password, name } = req.body;

    const user = await User.findOne({ where:{id}});
    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (email) user.email = email;
    if (name) user.name = name;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 6);
      user.password = hashedPassword;
    }

    await user.save();
    const updatedUser = user.get({ plain: true });
    delete updatedUser.password

    return res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Find the user
    const user = await User.findByPk(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (status === "Deleted") {
      await user.update({ status: "Deleted" });
      return res.status(200).json({
        success: true,
        message: "User status changed to deleted successfully"
      });
    }

    // Update status
    await user.update({ status });

    return res.status(200).json({
      success: true,
      message: `User status updated to ${status}`,
      data: user.toJSON()
    });

  } catch (error) {
    next(error);
  }
};