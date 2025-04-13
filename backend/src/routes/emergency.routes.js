// routes/emergency.routes.js
import { Router } from 'express';
import { 
  getEmergencyDetails,
  getFullEmergencyProfile 
} from '../controllers/emergency.controllers.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { requireDoctor } from '../middlewares/role.middleware.js';

const router = Router();

// Public route (no auth)
router.get('/:publicId', getEmergencyDetails);

// Doctor route (protected)
router.get('/doctor/:publicId', 
  verifyJWT, 
  requireDoctor, 
  getFullEmergencyProfile
);

export default router;