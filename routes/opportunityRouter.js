import { Router } from 'express';
import {
  getAllOpportunities,
  createOpportunity,
  getOpportunity,
  deleteOpportunity,
  updateOpportunity,
} from '../controllers/opportunityController.js';
import {
  validateOpportunityInput,
  validateOpportunityIdParam,
} from '../middleware/validationMiddleware.js';
import { formidableMiddleware } from '../middleware/formidableMiddleware.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = Router();

router
  .route('/')
  .get(getAllOpportunities)
  .post(
    [authenticateUser, formidableMiddleware, validateOpportunityInput],
    createOpportunity
  );
router.use('/:opportunityId', validateOpportunityIdParam);
router
  .route('/:opportunityId')
  .get(getOpportunity)
  .patch([authenticateUser, formidableMiddleware], updateOpportunity)
  .delete(authenticateUser, deleteOpportunity);

export default router;
