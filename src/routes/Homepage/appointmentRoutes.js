import express from "express";
import { createAppointment, getAllAppointments, getAppointmentById } from "../../controllers/HomePage/appointmentController.js";
import { appointmentValidation } from "../../validations/appointmentValidation.js";
import { validateRequest } from "../../middleware/validateRequest.js";

const router = express.Router();

//Appointment Routes 
router.post("/create", appointmentValidation, validateRequest, createAppointment);
router.get("/get-all", getAllAppointments);
router.get("/get/:id", getAppointmentById);

export default router;