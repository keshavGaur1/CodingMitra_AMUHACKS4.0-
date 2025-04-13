// routes/qr.routes.js
import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { getQRCode } from '../controllers/qr.controllers.js';

const router = Router();
router.use(verifyJWT);

router.route('/')
  .get(getQRCode); // GET /api/qr

export default router;