import express from "express";
import upload from "../../utils/upload.js";
import { authenticateToken } from "../../middleware/authorization.js";
import { createService, getAllServices, getServiceById, updateService, deleteService } from "../../controllers/HomePage/serviceController.js";
import { createServiceValidation, updateServiceValidation } from '../../validations/serviceValidation.js'
import { validateRequest } from '../../middleware/validateRequest.js'

const router = express.Router();

//Service Routes
router.post("/create", authenticateToken, upload.single("file_name"), createServiceValidation, validateRequest,createService);
router.get("/get-all", getAllServices);
router.get("/get/:id", getServiceById);
router.put("/update/:id", authenticateToken, upload.single("file_name"), updateServiceValidation, validateRequest, updateService);
router.delete("/delete/:id", authenticateToken, deleteService);

export default router;