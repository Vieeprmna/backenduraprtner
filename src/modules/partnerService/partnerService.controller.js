import { getAllPartnerServices, assignPartnerService, deletePartnerService } from "./partnerService.model.js";
import { success, error } from "../../utils/response.js";

// Get all partner services
export async function getPartnerServicesHandler(req, res) {
  try {
    const data = await getAllPartnerServices();
    return success(res, data, "Partner services fetched successfully");
  } catch (err) {
    return error(res, "Failed to fetch partner services", 500, err.message);
  }
}

// Assign partner to service
export async function assignPartnerServiceHandler(req, res) {
  try {
    const { partnerId, serviceId } = req.body;
    const assigned = await assignPartnerService({ partnerId, serviceId });
    return success(res, assigned, "Partner assigned to service successfully", 201);
  } catch (err) {
    return error(res, "Failed to assign partner to service", 500, err.message);
  }
}

// Delete partner service
export async function deletePartnerServiceHandler(req, res) {
  try {
    const { id } = req.params;
    const deleted = await deletePartnerService(id);
    if (!deleted) return error(res, "Mapping not found", 404);
    return success(res, deleted, "Partner service unassigned successfully");
  } catch (err) {
    return error(res, "Failed to delete partner service", 500, err.message);
  }
}
