import React from 'react';
//React Router being used for SPA functionality
import {BrowserRouter, Routes, Route} from 'react-router-dom'
//Component Imports
import Home from './components/home/Home';
import PoliticianComparison from './components/features/PoliticianComparison/PoliticianComparison';
import SignUp from './components/sign-up/SignUp';
import GoogleCivics from './components/features/GoogleCivics/GoogleCivics';
import Nav from './components/Nav/Nav'
import DistrictMap from './components/features/DistrictMap/DistrictMap';
import Stripe from './components/features/StripeIntegration/StripeIntegration'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comparison/" element={<PoliticianComparison />} />
        <Route path="/comparison/:search" element={<PoliticianComparison />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/civics/" element={<GoogleCivics />} />
        <Route path="/civics/:address" element={<GoogleCivics />} />
        <Route path="/districtmap" element={<DistrictMap />} />
        <Route path="/stripe" element={<Stripe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
