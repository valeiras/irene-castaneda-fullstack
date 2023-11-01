import { Router } from 'express';
import {
  getAllTutorings,
  createTutoring,
  getTutoring,
  deleteTutoring,
  updateTutoring,
  getTutoringTypes,
} from '../controllers/tutoringController.js';
import {
  validateTutoringInput,
  validateTutoringIdParam,
} from '../middleware/validationMiddleware.js';
import { formidableMiddleware } from '../middleware/formidableMiddleware.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = Router();

router
  .route('/')
  .get(getAllTutorings)
  .post(
    [authenticateUser, formidableMiddleware, validateTutoringInput],
    createTutoring
  );
router.route('/types').get(getTutoringTypes);
router.use('/:tutoringId', validateTutoringIdParam);
router
  .route('/:tutoringId')
  .get(getTutoring)
  .patch([authenticateUser, formidableMiddleware], updateTutoring)
  .delete(authenticateUser, deleteTutoring);

export default router;
