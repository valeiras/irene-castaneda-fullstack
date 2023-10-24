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
  validateProjectIdParam,
} from '../middleware/validationMiddleware.js';
import { formidableMiddleware } from '../middleware/formidableMiddleware.js';

const router = Router();

router
  .route('/')
  .get(getAllProjects)
  .post([formidableMiddleware, validateCreateProjectInput], createProject);
router.use('/:projectId', validateProjectIdParam);
router
  .route('/:projectId')
  .get(getProject)
  .patch(formidableMiddleware, updateProject)
  .delete(deleteProject);

export default router;
