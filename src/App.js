import React from 'react';
//React Router being used for SPA functionality
import {BrowserRouter, Routes, Route} from 'react-router-dom'
//Component Imports
import Home from './components/home/Home';
import PoliticianComparison from './components/features/PoliticianComparison/PoliticianComparison';
import SignUp from './components/sign-up/SignUp';
import Dashboard from './components/features/Dashboard/Dashboard';
import PoliticianProfile from './components/features/PoliticianProfile/ProfileFull';
import Nav from './components/Nav/Nav'
import DistrictMapPage from './components/features/DistrictMap/DistrictMapPage';
import Donations from './components/features/Donations/Donations';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comparison/" element={<PoliticianComparison />} />
        <Route path="/profile/:search" element={<PoliticianProfile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard/" element={<Dashboard />} />
        <Route path="/dashboard/:address" element={<Dashboard />} />
        <Route path="/districtmap" element={<DistrictMapPage />} />
        <Route path="/donations" element={<Donations />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
