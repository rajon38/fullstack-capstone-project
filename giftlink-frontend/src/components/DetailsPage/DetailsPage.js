import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetailsPage.css';
import { urlConfig } from '../../config';

function DetailsPage() {
  const { giftId } = useParams(); // Get the giftId from the URL
  const [gift, setGift] = useState(null); // State to hold the fetched gift data
  const [error, setError] = useState(''); // State to hold any errors
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Check authentication and redirect if necessary
  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      navigate('/app/login'); // Redirect to login page if not authenticated
    }
  }, [navigate]);

  // Fetch gift details
  useEffect(() => {
    const fetchGiftDetails = async () => {
      try {
        const response = await fetch(`${urlConfig.backendUrl}/api/gifts/${giftId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch gift details');
        }
        const data = await response.json();
        setGift(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchGiftDetails();
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, [giftId]);

  // Handle back button click
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!gift) {
    return <div>Loading...</div>; // Show loading state while data is being fetched
  }

  return (
    <div className="details-page container mt-5">
      <button onClick={handleBackClick} className="btn btn-secondary mb-4">Back</button>
      <div className="card-header">Gift Details</div>
      <div className="row">
        <div className="col-md-6">
          {/* Display the gift image */}
          {gift.image ? (
            <img src={gift.image} alt={gift.name} className="product-image-large" />
          ) : (
            <div className="no-image-available-large">No Image Available</div>
          )}
        </div>
        <div className="col-md-6">
          <h2 className="details-title">{gift.name}</h2>
          <p><strong>Category:</strong> {gift.category}</p>
          <p><strong>Condition:</strong> {gift.condition}</p>
          <p><strong>Age Group:</strong> {gift.ageGroup}</p>
          <p><strong>Date Added:</strong> {new Date(gift.createdAt).toLocaleDateString()}</p>
          <p><strong>Description:</strong> {gift.description}</p>

          {/* Comments Section */}
          <div className="comments-section mt-5">
            <h3>Comments</h3>
            {gift.comments && gift.comments.length > 0 ? (
              <ul>
                {gift.comments.map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
