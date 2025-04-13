import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProfileEdit() {
  const [form, setForm] = useState({
    name: '',
    bloodGroup: '',
    allergies: '',
    medications: '',
    emergencyContact: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setForm(res.data); // Pre-fill form with current profile data
      } catch (err) {
        setError('Error fetching profile data.');
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!form.name || !form.bloodGroup || !form.allergies || !form.medications || !form.emergencyContact) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);  // Show loading while sending request

    try {
      // Send the updated profile data to the server
      await axios.put('http://localhost:5000/api/profile', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Profile updated successfully');
      navigate('/dashboard');  // Redirect to dashboard after updating
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);  // Reset loading state
    }
  };

  return (
    <div className="profile-edit-container">
      <form onSubmit={handleSubmit}>
        <h2>Edit Health Profile</h2>

        {error && <p className="error-message">{error}</p>}  {/* Display error message */}

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          name="bloodGroup"
          value={form.bloodGroup}
          onChange={handleChange}
          placeholder="Blood Group"
        />
        <input
          name="allergies"
          value={form.allergies}
          onChange={handleChange}
          placeholder="Allergies"
        />
        <input
          name="medications"
          value={form.medications}
          onChange={handleChange}
          placeholder="Medications"
        />
        <input
          name="emergencyContact"
          value={form.emergencyContact}
          onChange={handleChange}
          placeholder="Emergency Contact"
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Save'}
        </button>
      </form>
    </div>
  );
}
