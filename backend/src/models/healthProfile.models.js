// models/healthProfile.models.js
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const emergencyContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Emergency contact name is required"]
  },
  phone: {
    type: String,
    required: [true, "Emergency contact phone is required"],
    // match: [/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"] // E.164 format
  }
});

const healthProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  dateOfBirth: {
    type: Date,
    validate: {
      validator: dob => dob < new Date(),
      message: "Date of birth cannot be in the future"
    }
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown']
  },
  allergies: {
    type: [String],
    default: []
  },
  medicalConditions: {
    type: [String],
    default: []
  },
  medications: {
    type: [String],
    default: []
  },
  emergencyContacts: [emergencyContactSchema],
  lastUpdated: {
    type: Date,
    default: Date.now
  },

  publicId: {
    type: String,
    default: uuidv4,
    unique: true
  } , 

  qrCode: {
    type: String, // Store as Data URL
    default: ""
  }

}, { timestamps: true });

// Index for faster querying
healthProfileSchema.index({ user: 1 }, { unique: true });

export const HealthProfile = mongoose.model('HealthProfile', healthProfileSchema);