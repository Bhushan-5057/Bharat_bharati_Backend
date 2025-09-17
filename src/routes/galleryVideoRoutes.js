import express from "express";
import { addVideo, getAllVideos, getVideoById, updateVideo, deleteVideo } from "../controllers/galleryVideosController.js";
import { validateVideoBody } from "../validations/galleryVideoValidation.js";
import {authenticateToken} from '../middleware/authorization.js'

const router = express.Router();

//Gallery Video Routes
router.post("/add", validateVideoBody,authenticateToken, addVideo);
router.get("/get-all", getAllVideos);
router.get("/get/:id", getVideoById);
router.put("/update/:id", validateVideoBody,authenticateToken, updateVideo);
router.delete("/delete/:id",authenticateToken, deleteVideo);

export default router;
