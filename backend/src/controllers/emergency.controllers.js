// controllers/emergency.controllers.js
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import  ApiResponse  from '../utils/ApiResponse.js';
import { HealthProfile } from '../models/healthProfile.models.js';

// Public Emergency Access (QR Scanners)
const getEmergencyDetails = asyncHandler(async (req, res) => {
  const profile = await HealthProfile.findOne({ 
    publicId: req.params.publicId 
  }).select(
    'bloodGroup allergies emergencyContacts -_id'
  );

  if(!profile) throw new ApiError(404, "Emergency profile not found");

  return res
    .status(200)
    .json(new ApiResponse(200, profile, "Emergency details retrieved"));
});

// Doctor Access (Full Profile)
const getFullEmergencyProfile = asyncHandler(async (req, res) => {
  const profile = await HealthProfile.findOne({
    publicId: req.params.publicId
  }).populate('user', 'fullName avatar');

  if(!profile) throw new ApiError(404, "Profile not found");

  return res
    .status(200)
    .json(new ApiResponse(200, profile, "Full emergency profile"));
});

export { getEmergencyDetails, getFullEmergencyProfile };