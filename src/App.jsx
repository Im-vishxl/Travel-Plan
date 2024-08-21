import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import MapComponent from './components/mapComponent';
import Navbar from './components/Navbar';
import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/go" element={<MapPage />} />
      </Routes>
    </>
  );
}

export default App;