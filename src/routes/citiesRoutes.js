import express from "express";
import upload from "../utils/upload.js";
import { authenticateToken } from "../middleware/authorization.js";
import { createCityValidation, updateCityValidation } from '../validations/citiesValidation.js'
import { createCity, getCityById, updateCity, deleteCity, getAllCities, updateCityImageById, deleteCityImageById } from "../controllers/citiesController.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

// Routes for Cities
router.post("/create", authenticateToken, upload.array("file_name"), createCityValidation, validateRequest, createCity);
router.get("/get-all", getAllCities);
router.get("/get/:id", getCityById);
router.put("/update/:id", authenticateToken, upload.array("file_name"), updateCityValidation, validateRequest, updateCity);
router.delete("/delete/:id", authenticateToken, deleteCity);

// Routes for Cities Images
router.put("/images/update/:id", authenticateToken, upload.array("file_name"), updateCityImageById);
router.delete("/images/delete/:id", authenticateToken, deleteCityImageById);

export default router;