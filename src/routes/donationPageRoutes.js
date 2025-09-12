import express from "express";
import upload from "../utils/upload.js";
import { authenticateToken } from "../middleware/authorization.js";
import { createDonationPage,getAllDonationPages,getDonationPage,updateDonationPage,deleteDonationPage } from "../controllers/donationPageController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { createDonationPageValidation, updateDonationPageValidation } from "../validations/donationPageValidation.js";

const router = express.Router();

router.post("/create", authenticateToken, upload.single("file_name"),createDonationPageValidation,validateRequest, createDonationPage);
router.get("/get-all", getAllDonationPages);
router.get("/get/:id", getDonationPage);
router.put("/update/:id", authenticateToken, upload.single("file_name"), updateDonationPageValidation,validateRequest, updateDonationPage);
router.delete("/delete/:id", authenticateToken, deleteDonationPage);

export default router;