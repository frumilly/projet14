// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage'; // Assure-toi d'importer la bonne page d'erreur
import './App.css';
import Layout from './components/Layout';
import EmployeeListPage from './pages/EmployeeListPage';
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/EmployeeListPage" element={<EmployeeListPage />} />
        </Route>
        
        {/* Page d'erreur pour les URL non trouvées */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
