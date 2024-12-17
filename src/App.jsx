import React from 'react';
import { BrowserRouter, Routes, Route, unstable_HistoryRouter as Router } from 'react-router-dom';
import TermsPage from './pages/TermsPage';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
