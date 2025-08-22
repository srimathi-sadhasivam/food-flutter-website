const crypto = require('crypto');

// Generate 6-digit OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Mock SMS service - In production, integrate with services like Twilio, AWS SNS, etc.
const sendOTP = async (phoneNumber, otp) => {
  try {
    console.log(`📱 SMS Service: Sending OTP ${otp} to +91${phoneNumber}`);
    
    // Mock implementation - replace with actual SMS service
    // Example with Twilio:
    /*
    const twilio = require('twilio');
    const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
    
    await client.messages.create({
      body: `Your WellFood verification code is: ${otp}. Valid for 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${phoneNumber}`
    });
    */
    
    // For development, we'll simulate success
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`✅ OTP sent successfully to +91${phoneNumber}`);
        resolve(true);
      }, 1000);
    });
    
  } catch (error) {
    console.error('SMS sending error:', error);
    return false;
  }
};

// Validate OTP format
const isValidOTP = (otp) => {
  return /^\d{6}$/.test(otp);
};

// Validate phone number format
const isValidPhoneNumber = (phoneNumber) => {
  return /^\d{10}$/.test(phoneNumber);
};

module.exports = {
  generateOTP,
  sendOTP,
  isValidOTP,
  isValidPhoneNumber
};
