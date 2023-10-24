import { FaBars } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/imgs/logo.svg';
import logoDarkMode from '../assets/imgs/logo_dark_mode.svg';

import Navlinks from './Navlinks';
import useGlobalContext from '../hooks/useGlobalContext';
import { TOGGLE_SHOW_LINKS } from '../assets/ts/actionTypes';

const Navbar: React.FC = () => {
  const {
    globalState: { isDarkMode },
    dispatch,
  } = useGlobalContext();

  const { pathname } = useLocation();

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          {pathname === `/` ? (
            <img
              src={logo}
              alt="tualuz"
              className="logo"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : (
            <Link to={`/`}>
              <img
                src={isDarkMode ? logoDarkMode : logo}
                alt="Irene Castañeda"
                className="logo"
              />
            </Link>
          )}
          <button
            className="nav-toggle"
            onClick={() => {
              dispatch({ type: TOGGLE_SHOW_LINKS, payload: {} });
            }}
          >
            <FaBars />
          </button>
        </div>
        <Navlinks />
      </div>
    </nav>
  );
};
export default Navbar;
