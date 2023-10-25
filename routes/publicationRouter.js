import { Router } from 'express';
import {
  getAllPublications,
  createPublication,
  getPublication,
  deletePublication,
  updatePublication,
} from '../controllers/publicationController.js';
import {
  validatePublicationInput,
  validatePublicationIdParam,
} from '../middleware/validationMiddleware.js';
import { formidableMiddleware } from '../middleware/formidableMiddleware.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = Router();

router
  .route('/')
  .get(getAllPublications)
  .post(
    [authenticateUser, formidableMiddleware, validatePublicationInput],
    createPublication
  );
router.use('/:publicationId', validatePublicationIdParam);
router
  .route('/:publicationId')
  .get(getPublication)
  .patch([authenticateUser, formidableMiddleware], updatePublication)
  .delete(authenticateUser, deletePublication);

export default router;
