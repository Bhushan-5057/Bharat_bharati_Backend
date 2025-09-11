import express from "express"
import upload from '../utils/upload.js'
import { createEducation, getAllEducations, getEducationById, updateEducation, deleteEducation,updateEducationImageById,deleteEducationImageById } from "../controllers/EducationController.js"
import { authenticateToken } from '../middleware/authorization.js';
import { validateRequest } from "../middleware/validateRequest.js";
import {createEducationValidation,updateEducationValidation} from '../validations/educationValidation.js'

const router = express.Router();

//Routes for Education
router.post("/create", authenticateToken, upload.array("file_name"), createEducationValidation, validateRequest, createEducation);
router.get("/get/:id", getEducationById);
router.get("/get-all", getAllEducations);
router.put("/update/:id", authenticateToken, upload.array("file_name"), updateEducationValidation, validateRequest, updateEducation);
router.delete("/delete/:id", authenticateToken, deleteEducation);

// Routes for Education Images
router.put("/images/update/:id", authenticateToken, upload.array("file_name"), updateEducationImageById);
router.delete("/images/delete/:id", authenticateToken, deleteEducationImageById);

export default router