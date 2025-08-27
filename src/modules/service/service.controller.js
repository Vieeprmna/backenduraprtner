import { getAllServices, createService, getServiceById, updateService, deleteService } from './service.model.js';
import { success, error } from '../../utils/response.js';

// Get all services
export async function getServicesHandler(req, res) {
  try {
    const services = await getAllServices();
    return success(res, services, "Services fetched successfully");
  } catch (err) {
    return error(res, "Failed to fetch services", 500, err.message);
  }
}

// Create service
export async function createServiceHandler(req, res) {
  try {
    const { serviceName, description, price } = req.body;
    const newService = await createService({ serviceName, description, price });
    return success(res, newService, "Service created successfully", 201);
  } catch (err) {
    return error(res, "Failed to create service", 500, err.message);
  }
}

// Get service by ID
export async function getServiceByIdHandler(req, res) {
  try {
    const { id } = req.params;
    const service = await getServiceById(id);
    if (!service) return error(res, "Service not found", 404);
    return success(res, service, "Service fetched successfully");
  } catch (err) {
    return error(res, "Failed to fetch service", 500, err.message);
  }
}

// Update service
export async function updateServiceHandler(req, res) {
  try {
    const { id } = req.params;
    const { serviceName, description, price } = req.body;
    const updatedService = await updateService({ id, serviceName, description, price });
    if (!updatedService) return error(res, "Service not found", 404);
    return success(res, updatedService, "Service updated successfully");
  } catch (err) {
    return error(res, "Failed to update service", 500, err.message);
  }
}

// Delete service
export async function deleteServiceHandler(req, res) {
  try {
    const { id } = req.params;
    const deletedService = await deleteService(id);
    if (!deletedService) return error(res, "Service not found", 404);
    return success(res, deletedService, "Service deleted successfully");
  } catch (err) {
    return error(res, "Failed to delete service", 500, err.message);
  }
}
