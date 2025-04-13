import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function EmergencyPage() {
  const { id } = useParams();  // Get the dynamic 'id' from URL params
  const [profile, setProfile] = useState(null);  // State to hold the profile data
  const [error, setError] = useState(null);  // State to handle errors
  const [scanSuccess, setScanSuccess] = useState(false);  // State to handle scan success animation

  useEffect(() => {
    const fetchProfile = () => {
      try {
        // Retrieve the emergency profile from localStorage
        const localData = localStorage.getItem(`emergency-${id}`);
        
        if (!localData) {
          setError('No emergency info found for this QR.');
          return;
        }

        setProfile(JSON.parse(localData));  // Set the fetched data to state
        setScanSuccess(true);  // Show scan success animation
        setTimeout(() => setScanSuccess(false), 3000);  // Hide scan success animation after 3 seconds
      } catch (error) {
        console.error('Error fetching emergency profile:', error);  // Error handling
        setError('Failed to fetch emergency info. Please try again later.');
      }
    };
    fetchProfile();  // Call the fetch function on page load
  }, [id]);  // Re-run the effect if 'id' changes

  if (error) {
    return <p className="error-message">{error}</p>;  // Display error message
  }

  if (!profile) {
    return (
      <div className="loading">
        <p>Loading emergency info...</p> {/* Loading state */}
      </div>
    );
  }

  const readAloud = () => {
    const msg = new SpeechSynthesisUtterance();
    msg.text = `
      Name: ${profile.name}
      Blood Group: ${profile.bloodGroup}
      Allergies: ${profile.allergies}
      Medications: ${profile.medications || 'None'}
      Emergency Contact: ${profile.emergencyContact}
    `;
    window.speechSynthesis.speak(msg);  // This will read the text aloud
  };

  return (
    <div className="emergency-page">
      <h2>Emergency Health Information</h2>
      <p><b>Name:</b> {profile.name}</p>
      <p><b>Blood Group:</b> {profile.bloodGroup}</p>
      <p><b>Allergies:</b> {profile.allergies}</p>
      <p><b>Medications:</b> {profile.medications || 'None'}</p>
      <p><b>Emergency Contact:</b> {profile.emergencyContact}</p>

      {/* Success Animation */}
      {scanSuccess && (
        <div className="scan-success-animation">
          <p>✅ QR Scanned Successfully!</p>
        </div>
      )}

      {/* "Read Aloud" Button */}
      <button onClick={readAloud}>🔊 Read Aloud</button>  {/* Button to trigger the read aloud function */}
    </div>
  );
}
