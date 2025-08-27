import express from "express";
import { 
  getAssignmentsHandler, 
  createAssignmentHandler, 
  endAssignmentHandler, 
  deleteAssignmentHandler 
} from "./assignment.controller.js";

const router = express.Router();

router.get("/", getAssignmentsHandler);
router.post("/", createAssignmentHandler);
router.put("/:id/end", endAssignmentHandler);
router.delete("/:id", deleteAssignmentHandler);

export default router;
