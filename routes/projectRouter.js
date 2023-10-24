import { Router } from 'express';
import {
  getAllProjects,
  createProject,
  getProject,
  deleteProject,
  updateProject,
} from '../controllers/projectController.js';
import {
  validateCreateProjectInput,
  validateIdParam,
} from '../middleware/validationMiddleware.js';
import { formidableMiddleware } from '../middleware/formidableMiddleware.js';

const router = Router();

router
  .route('/')
  .get(getAllProjects)
  .post([formidableMiddleware, validateCreateProjectInput], createProject);
router
  .route('/:id')
  .get(validateIdParam, getProject)
  .patch(validateIdParam, updateProject)
  .delete(validateIdParam, deleteProject);

export default router;
