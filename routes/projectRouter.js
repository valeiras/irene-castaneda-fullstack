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
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = Router();

router
  .route('/')
  .get(getAllProjects)
  .post(
    [authenticateUser, formidableMiddleware, validateCreateProjectInput],
    createProject
  );
router.use('/:projectId', validateProjectIdParam);
router
  .route('/:projectId')
  .get(getProject)
  .patch([authenticateUser, formidableMiddleware], updateProject)
  .delete(authenticateUser, deleteProject);

export default router;
