import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import CalendarPage from './CalendarPage';
import DayPage from './DayPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const ProtectedRoute = ({ element: Component }) => {
    return isAuthenticated ? <Component /> : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage setAuth={setIsAuthenticated} />} />
        <Route path="/calendar" element={<ProtectedRoute element={CalendarPage} />} />
        <Route path="/day/:date" element={<ProtectedRoute element={DayPage} />} />
        <Route path="/" element={<LoginPage setAuth={setIsAuthenticated} />} />
      </Routes>
    </Router>
  );
}

export default App;
