import { ApiError } from '../utils/ApiError.js';

export const requireDoctor = (req, res, next) => {
  if (req.user.role !== 'doctor') {
    throw new ApiError(403, 'Doctor privileges required');
  }
  next();
};
