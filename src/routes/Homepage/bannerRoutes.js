import express from "express";
import upload from "../../utils/upload.js";
import { createBanner, getAllBanners, getBannerById, updateBanner, deleteBanner } from "../../controllers/HomePage/bannerController.js";
import { authenticateToken } from "../../middleware/authorization.js";

const router = express.Router();

router.post("/create", authenticateToken, upload.single("image"), createBanner);
router.get("/get-all", getAllBanners);
router.get("/get/:id", getBannerById);
router.put("/update/:id", authenticateToken, upload.single("image"), updateBanner);
router.delete("/delete/:id", authenticateToken, deleteBanner);

export default router;
