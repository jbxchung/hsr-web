import { FC, useState } from 'react';

import logo from '../../assets/astral-express-logo.png';
import MenuIcon from '../Icons/MenuIcon';

import './Navbar.scss';

const Navbar: FC = () => {
  const [showNavMenu, setShowNavMenu] = useState(false);

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
            // Object.keys(pageMapping).map((pageName) => {
            //   const page = pageMapping[pageName];
            //   let url = page.url;
            //   let isActive = this.props.activePageId === url;
            //   if (Array.isArray(page.url)) {
            //     url = page.url[0];
            //     isActive = url.indexOf(this.props.activePageId) !== -1;
            //   }

            //   return (
            //     <NavbarLink
            //       active={isActive}
            //       key={url}
            //       onClick={this.onNavbarItemClick}
            //       target={url}
            //       title={page.navbarTitle}
            //     />
            //   );
            // })
          }
          navbar links placeholder
          
          <div className="navbar-user">
            login / user placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;