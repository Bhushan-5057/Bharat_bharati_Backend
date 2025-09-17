import { getDashboardData } from "../controllers/dashboardController.js";
import { authenticateToken } from '../middleware/authorization.js'
import express from "express";
const router = express.Router();

// Dashboard Route
router.get("/get", authenticateToken, getDashboardData);

export default router;