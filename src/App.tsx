
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
        {pages.map(pageConfig => (<Fragment key={pageConfig.path}>
          <Route  path={pageConfig.path} element={
            <pageConfig.component key={`${pageConfig.title}_component`} />
          } />
          <Route key={`${pageConfig.path}_wildcard`} path={`${pageConfig.path}/*`} element={
            <pageConfig.component />
          } />
        </Fragment>))}
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="*" element={<Navigate to="/login" />} /> */}
      </Routes>
    </div>
  </>);
};
  
export default App;