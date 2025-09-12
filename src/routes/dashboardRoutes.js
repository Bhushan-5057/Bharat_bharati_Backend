import { getDashboardData } from "../controllers/dashBoardController.js";
import { authenticateToken } from '../middleware/authorization.js'
import express from "express";
const router = express.Router(); 

router.get("/get", authenticateToken, getDashboardData);

export default router;