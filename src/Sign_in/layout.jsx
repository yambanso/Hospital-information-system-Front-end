import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sign_in from './Sign_in';

export default function Layout() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Sign_in/>}/>
        </Routes>
      </BrowserRouter>
  )
}
