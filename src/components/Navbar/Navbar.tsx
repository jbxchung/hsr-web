import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { LoginPage, getRoleBasedPages } from '../pages';

import NavbarLink from './NavbarLink';
import MenuIcon from '../Icons/MenuIcon';

import logo from '../../assets/astral-express-logo.png';
import defaultProfilePicture from '../../assets/default-pfp.png';
import './Navbar.scss';

const Navbar: FC = () => {
  const { user, logout } = useAuth();
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const location = useLocation();

  const pages = getRoleBasedPages(user);

  // for mobile screen - on click, collapse navbar if open
  const linkAreaRef = useRef<HTMLDivElement>(null);
  const handleOutsideClick = (e: MouseEvent) => {
    if (linkAreaRef.current && !linkAreaRef.current.contains(e.target as Element)) {
      setShowNavMenu(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick, false);
    
    return () => {
      document.removeEventListener('click', handleOutsideClick, false);
    }
  }, [handleOutsideClick]);

  const toggleUserDropdown = useCallback(() => {
    setShowUserDropdown(!showUserDropdown);
  }, [showUserDropdown, setShowUserDropdown]);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="logo" className="home-logo" onClick={() => window.location.href = '/'} />
      </div>
      <div ref={linkAreaRef} className="navbar-content">
        <span className="navbar-menu-icon" onClick={() => setShowNavMenu(!showNavMenu)}>
          <MenuIcon />
        </span>
        <div className={`navbar-links${showNavMenu ? ' open' : ''}`}>
          {
            pages.map(({ path, title }) => (
              <NavbarLink
                key={path}
                active={path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)}
                target={path}
                title={title}
                onClick={() => {setShowNavMenu(false)}}
              />
            ))
          }
          <div className="navbar-right">
            {user ?
              <div className={`navbar-link`} onClick={toggleUserDropdown}>
                <span className="user-profile-nav">
                  <img src={defaultProfilePicture} alt="profile picture" className="profile-icon" />
                  {user.username}
                </span>
                {showUserDropdown &&
                  <div className="navbar-link-dropdown">
                    <span className="logout-button" onClick={logout}>Logout</span>
                  </div>
                }
              </div>
              :
              <NavbarLink
                active={location.pathname.startsWith(LoginPage.path)}
                target={LoginPage.path}
                title={LoginPage.title}
                onClick={() => {setShowNavMenu(false)}}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;