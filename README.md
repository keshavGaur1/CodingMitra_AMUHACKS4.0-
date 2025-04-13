# CodingMitra_AMUHACKS4.0-
QR LifeKey is a QR-based Emergency Health ID system that acts as a digital life card. Victims carry a QR (on phone wallpaper or card), which when scanned, shows their essential medical details instantly — without unlocking the phone. #AMUHACKS4.0 #CSSAMU #AMU

# QR-Based Emergency Health ID System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Node.js CI](https://github.com/yourusername/emergency-qr-id/workflows/Node.js%20CI/badge.svg)

A secure, instant-access medical profile solution for emergencies using QR technology.

## Table of Contents
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Workflow](#workflow)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
### Problem Statement
In emergency situations, first responders often lack immediate access to critical medical information about patients.

### Our Solution
A digital health profile accessible via:
- **Public QR Scan**: Shows blood type, allergies, and emergency contacts
- **Doctor Access**: Provides full medical history after authentication

## Key Features
### For Users
- 📱 Create and manage digital health profiles
- 🖨️ Generate/download printable QR codes
- 🔄 Real-time profile updates

### For Medical Professionals
- 🔍 Secure access to full patient histories
- 📲 Mobile-optimized emergency view
- 🛡️ Role-based access control

## Tech Stack
### Backend
| Component       | Technology |
|----------------|------------|
| Framework      | Node.js + Express |
| Database       | MongoDB (Mongoose) |
| Authentication | JWT + Bcrypt |
| QR Generation  | `qrcode` npm package |

### Frontend (Coming Soon)
- React.js + Vite
- Tailwind CSS
- react-qr-reader

## Installation
### Prerequisites
- Node.js v16+
- MongoDB Atlas account or local instance
- Git

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/emergency-qr-id.git
   cd emergency-qr-id/backend
