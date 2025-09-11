import express from "express";
import { addImage, getAllImages, getImageById, updateImage, deleteImage } from "../controllers/galleryImageController.js";
import { authenticateToken } from '../middleware/authorization.js'
import upload from "../utils/upload.js";
import {GalleryImageValidation,updateGalleryImageValidation} from "../validations/galleryImageValidation.js";

const router = express.Router();

router.post("/add", authenticateToken, upload.array("file_name"),GalleryImageValidation, addImage);
router.get("/get-all", getAllImages);
router.get("/get/:id", getImageById);
router.put("/update/:id", authenticateToken, upload.array("file_name"),updateGalleryImageValidation, updateImage);
router.delete("/delete/:id", authenticateToken, deleteImage);

export default router;
