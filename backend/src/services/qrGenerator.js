// services/qrGenerator.js
import QRCode from 'qrcode';
import { HealthProfile } from '../models/healthProfile.models.js';

export const generateAndSaveQR = async (userId) => {
  try {
    const profile = await HealthProfile.findOne({ user: userId });
    if (!profile) throw new Error("Profile not found");
    
    // Generate QR code with the profile's public ID
    const url = `${process.env.BASE_URL}/api/emergency/${profile.publicId}`;

    // Generate QR code and convert it to a data URL
    const qrDataURL = await QRCode.toDataURL(url);
    
    
    profile.qrCode = qrDataURL;
    await profile.save();
    
    return qrDataURL;
  } catch (error) {
    throw new Error(`QR generation failed: ${error.message}`);
  }
};