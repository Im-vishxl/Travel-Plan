import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';  
import MapImg from '../assets/mapimg.jpeg';

const Home = () => {
  const [locations, setLocations] = useState([{ value: '' }]);
  const navigate = useNavigate();

  const handleInputChange = (index, event) => {
    const newLocations = [...locations];
    newLocations[index].value = event.target.value;
    setLocations(newLocations);
  };

  const handleAddDestination = () => {
    setLocations([...locations, { value: '' }]);
  };

  const handleRemoveDestination = (index) => {
    const newLocations = [...locations];
    newLocations.splice(index, 1);
    setLocations(newLocations);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const startingPoint = locations[0].value;
    const destinations = locations.slice(1).map(location => location.value);
    const addresses = [startingPoint, ...destinations];

    try {
      const response = await axios.post('http://localhost:3000/api/geocode', { addresses });
      const coordinatesData = response.data;
      console.log('Coordinates:', coordinatesData);

      navigate('/go', { state: { coordinatesData } });
      
      //navigate('/go', { state: { coordinates: coordinatesData } });

      // const routeResponse = await axios.post('http://localhost:3000/api/route', { coordinatesData });
      // const routeData = routeResponse.data;

      // Navigate to map page with route data
      //navigate('/go', { state: { routeData } });

      // Add logic here to handle routing or map rendering with these coordinates
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="left">
        <form onSubmit={handleSubmit} >
            {locations.map((location, index) => (
            <div key={index} className="input-group-container mb-3">
                <label className="input-label">
                {index === 0 ? 'Starting Point' : `Destination ${index}`}
                </label>
                <div className="input-group">
                <input
                    type="text"
                    className="form-input"
                    value={location.value}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder={
                    index === 0 ? 'Enter starting point' : `Enter destination ${index}`
                    }
                />
                {index > 0 && (
                    <button
                    type="button"
                    className="btn btn-remove"
                    onClick={() => handleRemoveDestination(index)}
                    >
                    Remove
                    </button>
                )}
                </div>
            </div>
            ))}
            <div className='lastbtns'>
                <button
                type="button"
                className="btn btn-add"
                onClick={handleAddDestination}
                >
                Add Destination
                </button>
                <button type="submit" className="btn btn-submit">
                Go.
                </button>
            </div>
        </form>
      </div>
      <div className="right">
      <img src={MapImg} alt="Descriptive Alt Text" className="image" />
      </div>
    </div>
  );
};

export default Home;
