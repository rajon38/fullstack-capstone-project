import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';

function MainPage() {
    const [gifts, setGifts] = useState([]);
    const [error, setError] = useState(null);  // Track error state
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all gifts from the backend
        const fetchGifts = async () => {
            try {
                let url = `${urlConfig.backendUrl}/api/gifts`; // Modify to your API URL
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                
                // Ensure data.docs exists and is an array
                if (Array.isArray(data.docs)) {
                    setGifts(data.docs);
                } else {
                    throw new Error('Invalid data structure: docs array not found');
                }
            } catch (error) {
                console.error('Error fetching gifts:', error);
                setError('Failed to load gifts. Please try again later.');
            }
        };
        fetchGifts();
    }, []);

    // Navigate to the gift details page
    const goToDetailsPage = (giftId) => {
        navigate(`/gifts/${giftId}`);
    };

    // Format timestamp to a readable date
    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert Unix timestamp (seconds) to milliseconds
        return date.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    // Get CSS class for condition display
    const getConditionClass = (condition) => {
        if (condition === 'New') {
            return 'text-success';
        } else if (condition === 'Like New') {
            return 'text-warning';
        } else if (condition === 'Older') {
            return 'text-danger';
        } else {
            return 'text-secondary';
        }
    };

    return (
        <div className="container mt-5">
            {error ? (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            ) : (
                <div className="row">
                    {gifts && gifts.length > 0 ? (
                        gifts.map((gift) => (
                            <div key={gift.id} className="col-md-4 mb-4">
                                <div className="card">
                                    {/* Display gift image or placeholder */}
                                    {gift.image ? (
                                        <img src={gift.image} alt={gift.name} className="card-img-top" />
                                    ) : (
                                        <div className="card-img-top no-image-placeholder">No Image Available</div>
                                    )}

                                    <div className="card-body">
                                        {/* Display gift name */}
                                        <h5 className="card-title">{gift.name}</h5>

                                        {/* Display gift condition */}
                                        <p className={`card-text ${getConditionClass(gift.condition)}`}>
                                            {gift.condition}
                                        </p>

                                        {/* Display formatted date */}
                                        <p className="card-text">{formatDate(gift.date_added)}</p>

                                        {/* Button to view details */}
                                        <button
                                            onClick={() => goToDetailsPage(gift.id)}
                                            className="btn btn-primary"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No gifts available at the moment.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default MainPage;
