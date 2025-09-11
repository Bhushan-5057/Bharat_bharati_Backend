import express from "express"
import upload from '../utils/upload.js'
import { addCertificate, getAllCertificates, getCertificateById, updateCertificate, deleteCertificate } from "../controllers/certificateController.js"
import { authenticateToken } from '../middleware/authorization.js';
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

router.post("/add", authenticateToken, upload.single("pdf"), validateRequest, addCertificate);
router.get("/get/:id", getCertificateById);
router.get("/get-all", getAllCertificates);
router.put("/update/:id", authenticateToken, upload.single("pdf"), validateRequest, updateCertificate);
router.delete("/delete/:id", authenticateToken, deleteCertificate);

export default router