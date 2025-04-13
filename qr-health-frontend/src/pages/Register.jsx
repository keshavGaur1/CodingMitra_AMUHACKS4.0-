import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import './register.css';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    emergencyContact: '',
    bloodGroup: '',
    allergies: '',
    disease: '',
    medicalConditions: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [qrGenerated, setQrGenerated] = useState(false);
  const [qrUrl, setQrUrl] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.emergencyContact || !form.bloodGroup) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // ⏳ Simulate backend delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 🎭 Simulate fake user ID
      const fakeUserId = `demo_${Math.random().toString(36).substring(2, 10)}`;

      // 🌐 Create Emergency Page URL
      const userHealthUrl = `http://localhost:3000/emergency/${fakeUserId}`;

      // 🎯 Set QR URL
      setQrUrl(userHealthUrl);
      setQrGenerated(true);

      // 🕒 Redirect to login after 5s
      //setTimeout(() => {
       // navigate('/login');
      //}, 5000);
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {!qrGenerated ? (
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
  
          {error && <p className="error-message">{error}</p>}
  
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <input
            name="emergencyContact"
            value={form.emergencyContact}
            onChange={handleChange}
            placeholder="Emergency Contact"
            required
          />
  
          <select
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handleChange}
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
  
          <input
            name="allergies"
            value={form.allergies}
            onChange={handleChange}
            placeholder="Allergies (if any)"
          />
          <input
            name="disease"
            value={form.disease}
            onChange={handleChange}
            placeholder="Disease (e.g., Asthma, Cancer)"
          />
          <textarea
            name="medicalConditions"
            value={form.medicalConditions}
            onChange={handleChange}
            placeholder="Medical Conditions"
            rows={3}
          />
  
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register & Generate QR'}
          </button>
        </form>
      ) : (
        <div className="qr-fullscreen">
          <QRCode value={qrUrl} size={300} />
        </div>
      )}
    </div>
  );
}
