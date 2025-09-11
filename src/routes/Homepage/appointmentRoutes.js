import express from "express";
import { createAppointment, getAllAppointments, getAppointmentById, updateAppointment, deleteAppointment } from "../../controllers/HomePage/appointmentController.js";
import { appointmentUpdateValidation, appointmentValidation } from "../../validations/appointmentValidation.js";
import { validateRequest } from "../../middleware/validateRequest.js";

const router = express.Router();

router.post("/create", appointmentValidation, validateRequest, createAppointment);
router.get("/get-all", getAllAppointments);
router.get("/get/:id", getAppointmentById);
router.put("/update/:id", appointmentUpdateValidation, validateRequest,updateAppointment);
router.delete("/delete/:id", deleteAppointment);

export default router;
