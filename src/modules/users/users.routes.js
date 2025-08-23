import express from 'express';
import { 
  getUsersHandler, 
  createUserHandler, 
  loginHandler, 
  updateUserRoleHandler,
  deleteUserHandler 
} from './users.controller.js';
import { verifySuperAdmin } from '../../middleware/auth.js';

const router = express.Router();

router.get('/', verifySuperAdmin, getUsersHandler); // hanya super_admin
router.post('/', createUserHandler);
router.post('/login', loginHandler);
router.put('/:id/role', verifySuperAdmin, updateUserRoleHandler);
router.delete('/:id', verifySuperAdmin, deleteUserHandler) // hanya super_admin

export default router;
