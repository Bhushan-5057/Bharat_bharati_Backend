import express from "express";
import upload from "../../utils/upload.js";
import { createOfficeBearer, deleteOfficeBearer, getAllOfficeBearer, getOfficeBearerById, updateOfficeBearer } from "../../controllers/HomePage/officeBearerController.js";
import { authenticateToken } from "../../middleware/authorization.js";
import { createOfficeBearerValidation, updateOfficeBearerValidation } from '../../validations/officeBearerValidation.js'
import { validateRequest } from '../../middleware/validateRequest.js'

const router = express.Router();

router.post("/create", authenticateToken, upload.single("file_name"), createOfficeBearerValidation, validateRequest,  createOfficeBearer);
router.get("/get-all", getAllOfficeBearer);
router.get("/get/:id", getOfficeBearerById);
router.put("/update/:id", authenticateToken, upload.single("file_name"), updateOfficeBearerValidation, validateRequest,  updateOfficeBearer);
router.delete("/delete/:id", authenticateToken, deleteOfficeBearer);

export default router;
