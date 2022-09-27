import React from 'react';
//React Router being used for SPA functionality
import {BrowserRouter, Routes, Route} from 'react-router-dom'
//Component Imports
import Home from './components/home/Home';
import PoliticianComparison from './components/features/PoliticianComparison/PoliticianComparison';
import SignUp from './components/sign-up/SignUp';

function App() {
  return (
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/comparison"  element={<PoliticianComparison />}/>
        <Route path="/signup" element={<SignUp />}/>
        </Routes>
        </BrowserRouter>


  );
}

export default App;
