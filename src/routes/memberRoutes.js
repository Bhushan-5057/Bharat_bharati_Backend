import express from "express";
import { authenticateToken } from "../middleware/authorization.js";
import { createMemberValidation, updateMemberValidation } from "../validations/memberValidation.js";
import { createMember, deleteMember, getAllMembers, getMemberById, updateMember } from "../controllers/memberController.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

// Member Routes
router.post("/create", authenticateToken, createMemberValidation, validateRequest, createMember);
router.get("/get-all", getAllMembers);
router.get("/get/:id", getMemberById);
router.put("/update/:id", authenticateToken, updateMemberValidation, validateRequest, updateMember);
router.delete("/delete/:id", authenticateToken, deleteMember);

export default router;
