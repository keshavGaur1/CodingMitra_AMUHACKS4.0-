import { useState, useRef } from 'react';
import QRCode from 'react-qr-code';

export default function StealthQRUpload() {
  const [image, setImage] = useState(null);
  const [qrCodeValue, setQrCodeValue] = useState('');
  const imageRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleQrChange = (e) => {
    setQrCodeValue(e.target.value);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Stealth QR Wallpaper</h2>
      <input type="file" onChange={handleImageChange} />
      <input
        type="text"
        value={qrCodeValue}
        onChange={handleQrChange}
        placeholder="Enter QR Code Value"
        style={{ margin: '10px', padding: '5px' }}
      />

      <div style={{ position: 'relative', display: 'inline-block', marginTop: '20px' }}>
        {image && (
          <>
            <img
              ref={imageRef}
              src={image}
              alt="Wallpaper"
              style={{ width: '300px', height: 'auto', borderRadius: '10px' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                background: 'white',
                padding: '5px',
                borderRadius: '5px',
              }}
            >
              <QRCode value={qrCodeValue || 'https://example.com'} size={80} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
