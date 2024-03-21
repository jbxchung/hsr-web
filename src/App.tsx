
import { FC } from 'react';
import LoginPage from './components/Login';
import Navbar from './components/Navbar/Navbar';
import { AuthContext } from './contexts/AuthContext';

const App: FC = () => {
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Navbar />
      <div>
        <h1>init</h1>
        <LoginPage />
      </div>
    </AuthContext.Provider>
  );
};
  
export default App;