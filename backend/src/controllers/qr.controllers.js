// controllers/qr.controllers.js
import { asyncHandler } from '../utils/asyncHandler.js';
import  ApiResponse from '../utils/ApiResponse.js';
import { generateAndSaveQR } from '../services/qrGenerator.js';

const getQRCode = asyncHandler(async (req, res) => {
  const qrCode = await generateAndSaveQR(req.user._id);
  
  return res
    .status(200)
    .json(new ApiResponse(200, { qrCode }, "QR code generated"));
});

export { getQRCode };