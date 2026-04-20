import express from 'express';
import { 
  getTransactions, 
  createTransaction, 
  getGoals, 
  createGoal
} from '../controllers/financeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/transactions')
  .get(getTransactions)
  .post(createTransaction);

router.route('/goals')
  .get(getGoals)
  .post(createGoal);


export default router;
