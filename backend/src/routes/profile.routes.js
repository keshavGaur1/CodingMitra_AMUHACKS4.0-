import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { 
  updateHealthProfile, 
  getHealthProfile 
} from '../controllers/profile.controllers.js';

const router = Router();

// Secure all profile routes
router.use(verifyJWT);

router.route('/')
  .get(getHealthProfile)    // GET /api/profile
  .patch(updateHealthProfile); // PATCH /api/profile

export default router;