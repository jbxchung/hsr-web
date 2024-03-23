
import { FC } from 'react';
import LoginPage from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.scss';

const App: FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <div className="main-content">
          <div className="bg" />
          <Routes>
            <Route path="/" element={<div>home page placeholder</div>} />
            <Route path="/characters" element={<div>characters page placeholder</div>} />
            <Route path="/lightcones" element={<div>light cones page placeholder</div>} />
            <Route path="/pullrecords" element={<div>POST AUTH ONLY: pull records page placeholder</div>} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};
  
export default App;