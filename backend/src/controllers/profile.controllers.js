import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import  ApiResponse  from '../utils/ApiResponse.js';
import { HealthProfile } from '../models/healthProfile.models.js';

const updateHealthProfile = asyncHandler(async (req, res) => {
  const { 
    dateOfBirth, 
    bloodGroup, 
    allergies, 
    medicalConditions, 
    medications, 
    emergencyContacts 
  } = req.body;

  // Validate emergency contacts
  if(emergencyContacts && emergencyContacts.some(ec => !ec.name || !ec.phone)) {
    throw new ApiError(400, "Emergency contacts require both name and phone");
  }

  const updatedProfile = await HealthProfile.findOneAndUpdate(
    { user: req.user._id },
    {
      dateOfBirth,
      bloodGroup,
      allergies,
      medicalConditions,
      medications,
      emergencyContacts
    },
    { new: true, runValidators: true , upsert: true}
  );

  if(!updatedProfile) {
    throw new ApiError(500, "Failed to update health profile");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedProfile, "Health profile updated"));
});

const getHealthProfile = asyncHandler(async (req, res) => {
  const profile = await HealthProfile.findOne({ user: req.user._id });
  
  if(!profile) {
    throw new ApiError(404, "Health profile not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, profile, "Health profile retrieved"));
});

export { updateHealthProfile, getHealthProfile };