import express from "express";
import upload from "../utils/upload.js";
import { authenticateToken } from "../middleware/authorization.js";
import { createActivitiesValidation, updateActivitiesValidation } from '../validations/activitiesValidation.js'
import { createActivities, getActivityById, updateActivities, deleteActivities, getAllActivities, } from "../controllers/activitiesController.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

router.post("/create", authenticateToken, upload.single("file_name"), createActivitiesValidation, validateRequest, createActivities);
router.get("/get-all", getAllActivities);
router.get("/get/:id", getActivityById);
router.put("/update/:id", authenticateToken, upload.single("file_name"), updateActivitiesValidation, validateRequest, updateActivities);
router.delete("/delete/:id", authenticateToken, deleteActivities);

export default router;
