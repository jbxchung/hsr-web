
import { FC, Fragment } from 'react';
import LoginPage from './pages/Login/Login';
import Navbar from './components/Navbar/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { useAuth } from './hooks/useAuth';
import { getRoleBasedPages } from './pages';

const App: FC = () => {
  const { user } = useAuth();

  const pages = getRoleBasedPages(user);

  return (<>
    <Navbar />
    <div className="main-content-wrapper">
      <Routes>
        {pages.map(pageConfig => (
          <Route key={pageConfig.path} path={`${pageConfig.path}/*`} element={
            <pageConfig.component />
          } />
        ))}
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="*" element={<Navigate to="/login" />} /> */}
      </Routes>
    </div>
  </>);
};
  
export default App;