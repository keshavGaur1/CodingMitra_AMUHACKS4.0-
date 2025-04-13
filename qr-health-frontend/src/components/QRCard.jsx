import React, { useState } from "react";
import QRCode from "qrcode.react";
import { saveAs } from "file-saver";

const Dashboard = ({ userDetails }) => {
  const [qrUrl, setQrUrl] = useState("");

  // After registration, generate a URL for the user's public profile
  const generateQrCode = () => {
    const uniqueUserUrl = `https://yourdomain.com/user-profile/${userDetails.name}`;
    setQrUrl(uniqueUserUrl);
  };

  // Function to download QR code image
  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-code-canvas");
    const imageUrl = canvas.toDataURL("image/png");
    saveAs(imageUrl, "user-qrcode.png");
  };

  // Generate QR code after registration
  React.useEffect(() => {
    if (userDetails.name) {
      generateQrCode();
    }
  }, [userDetails]);

  return (
    <div className="dashboard">
      <h1>Your Unique QR Code</h1>
      {qrUrl && (
        <>
          <QRCode id="qr-code-canvas" value={qrUrl} size={256} />
          <button onClick={downloadQRCode}>Download QR Code</button>
        </>
      )}
    </div>
  );
};

export default Dashboard;
