import {Router} from 'express';
import {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlans
} from '../controllers/tourController.js';
import { protect, restrictTo } from '../controllers/authController.js';

const router = Router();
router.route('/top-5-cheap').get(aliasTopTours,getAllTours);
router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plans/:year').get(getMonthlyPlans);
router.route('/').get(protect,getAllTours).post(createTour);

router.route('/:id').get(getTour).patch(updateTour).delete(protect, restrictTo(['admin','lead-guide']) ,deleteTour); 

export default router;