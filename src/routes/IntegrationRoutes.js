import express from "express";
import upload from "../utils/upload.js";
import { authenticateToken } from "../middleware/authorization.js";
import { createIntegrationValidation, updateIntegrationValidation } from '../validations/IntegrationValidation.js'
import { createIntegration, getAllIntegrations, getIntegrationById, updateIntegration, deleteIntegration, } from "../controllers/IntegrationController.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

//Integration Routes
router.post("/create", authenticateToken, upload.single("file_name"), createIntegrationValidation, validateRequest, createIntegration);
router.get("/get-all", getAllIntegrations);
router.get("/get/:id", getIntegrationById);
router.put("/update/:id", authenticateToken, upload.single("file_name"), updateIntegrationValidation, validateRequest, updateIntegration);
router.delete("/delete/:id", authenticateToken, deleteIntegration);

export default router;