
import { FC } from 'react';
import LoginPage from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import { AuthContext } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import { BrowserRouter } from 'react-router-dom';

import './App.scss';

const App: FC = () => {
  const { user, login, logout, setUser } = useAuth();
  
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, setUser }}>
        <Navbar />
        <div className="main-content">
          <h1>init</h1>
          <LoginPage />
        </div>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};
  
export default App;