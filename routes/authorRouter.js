import { Router } from 'express';
import {
  getAllAuthors,
  createAuthor,
  getAuthor,
  deleteAuthor,
  updateAuthor,
} from '../controllers/authorController.js';
import {
  validateAuthorInput,
  validateAuthorIdParam,
} from '../middleware/validationMiddleware.js';
import { formidableMiddleware } from '../middleware/formidableMiddleware.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = Router();

router
  .route('/')
  .get(getAllAuthors)
  .post(
    [authenticateUser, formidableMiddleware, validateAuthorInput],
    createAuthor
  );
router.use('/:authorId', validateAuthorIdParam);
router
  .route('/:authorId')
  .get(getAuthor)
  .patch([authenticateUser, formidableMiddleware], updateAuthor)
  .delete(authenticateUser, deleteAuthor);

export default router;
