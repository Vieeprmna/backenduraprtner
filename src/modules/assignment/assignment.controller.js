import { getAllAssignments, createAssignment, endAssignment, deleteAssignment } from "./assignment.model.js";
import { success, error } from "../../utils/response.js";

// Get all assignments
export async function getAssignmentsHandler(req, res) {
  try {
    const data = await getAllAssignments();
    return success(res, data, "Assignments fetched successfully");
  } catch (err) {
    return error(res, "Failed to fetch assignments", 500, err.message);
  }
}

// Create assignment
export async function createAssignmentHandler(req, res) {
  try {
    const { partnerId, portfolioId } = req.body;
    const newAssignment = await createAssignment({ partnerId, portfolioId });
    return success(res, newAssignment, "Assignment created successfully", 201);
  } catch (err) {
    return error(res, "Failed to create assignment", 500, err.message);
  }
}

// End assignment
export async function endAssignmentHandler(req, res) {
  try {
    const { id } = req.params;
    const { endedAt } = req.body;
    const updated = await endAssignment({ id, endedAt });
    if (!updated) return error(res, "Assignment not found", 404);
    return success(res, updated, "Assignment ended successfully");
  } catch (err) {
    return error(res, "Failed to end assignment", 500, err.message);
  }
}

// Delete assignment
export async function deleteAssignmentHandler(req, res) {
  try {
    const { id } = req.params;
    const deleted = await deleteAssignment(id);
    if (!deleted) return error(res, "Assignment not found", 404);
    return success(res, deleted, "Assignment deleted successfully");
  } catch (err) {
    return error(res, "Failed to delete assignment", 500, err.message);
  }
}
