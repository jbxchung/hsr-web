import { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { LoginPage, getRoleBasedPages } from '../pages';

import NavbarLink from './NavbarLink';
import MenuIcon from '../Icons/MenuIcon';

import logo from '../../assets/astral-express-logo.png';
import './Navbar.scss';

const Navbar: FC = () => {
  const { user } = useAuth();
  const [showNavMenu, setShowNavMenu] = useState(false);

  const location = useLocation();

  const pages = getRoleBasedPages(user);

  console.log(pages);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="logo" className="home-logo" onClick={() => window.location.href = '/'} />
      </div>
      <div className="navbar-content">
        <span className="navbar-menu-icon" onClick={() => setShowNavMenu(!showNavMenu)}>
          <MenuIcon />
        </span>
        <div className={`navbar-links${showNavMenu ? ' open' : ''}`}>
          {
            pages.map(({ path, title }) => (
              <NavbarLink
                key={path}
                active={location.pathname.startsWith(path)}
                target={path}
                title={title}
                onClick={() => {console.log('navber item clicked:', title)}}
              />
            ))
          }
          
          <div className="navbar-user">
            <NavbarLink
              active={false}
              target={LoginPage.path}
              title={LoginPage.title}
              onClick={() => {console.log('login page nav click')}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;