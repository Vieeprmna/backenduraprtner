import express from 'express';
import { 
  getServicesHandler, 
  createServiceHandler, 
  getServiceByIdHandler, 
  updateServiceHandler, 
  deleteServiceHandler 
} from './service.controller.js';

const router = express.Router();

router.get('/', getServicesHandler);
router.post('/', createServiceHandler);
router.get('/:id', getServiceByIdHandler);
router.put('/:id', updateServiceHandler);
router.delete('/:id', deleteServiceHandler);

export default router;
