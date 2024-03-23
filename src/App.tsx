
import { FC } from 'react';
import LoginPage from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';

import './App.scss';
import { useAuth } from './hooks/useAuth';
import { getRoleBasedPages } from './components/pages';

const App: FC = () => {
  const { user } = useAuth();

  const pages = getRoleBasedPages(user);

  return (<>
    <Navbar />
    <div className="main-content">
      <div className="bg" />
      <Routes>
        {pages.map(pageConfig => (
          <Route key={pageConfig.path} path={pageConfig.path} element={<pageConfig.component />} />
        ))}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  </>);
};
  
export default App;