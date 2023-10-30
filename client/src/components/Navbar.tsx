import styled from 'styled-components';

import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/imgs/logo.svg';
import logoDarkMode from '../assets/imgs/logo_dark_mode.svg';

import Navlinks from './Navlinks';
import useGlobalContext from '../hooks/useGlobalContext';
import { TOGGLE_SHOW_LINKS, SET_SHOW_LINKS } from '../utils/actionTypes';
import { ISection } from '../utils/types';

const Navbar: React.FC<{ sections: ISection[] }> = ({ sections }) => {
  const {
    globalState: { isDarkMode },
    dispatch,
  } = useGlobalContext();

  return (
    <Wrapper className="Navbar">
      <div className="nav-center">
        <div className="nav-header">
          <Link to={`/`}>
            <img
              src={isDarkMode ? logoDarkMode : logo}
              alt="Irene Castañeda"
              className="logo"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                dispatch({ type: SET_SHOW_LINKS, payload: false });
              }}
            />
          </Link>
          <button
            className="nav-toggle"
            onClick={() => {
              dispatch({ type: TOGGLE_SHOW_LINKS, payload: {} });
            }}
          >
            <FaBars />
          </button>
        </div>
        <Navlinks sections={sections} />
      </div>
    </Wrapper>
  );
};
export default Navbar;

const Wrapper = styled.nav`
  z-index: 100;
  background-color: var(--navbar-bg-color);
  color: var(--text-color);
  box-shadow: var(--shadow-1);
  position: fixed;
  top: var(--height-topbar);
  width: 100%;
  transition: var(--bg-transition);

  .nav-center {
    margin: 0 1rem;
  }

  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .nav-toggle {
    font-size: 1.5rem;
    background: transparent;
    border-color: transparent;
    transition: var(--transition);
    cursor: pointer;
    margin-top: 5px;
    color: inherit;
  }

  .nav-toggle:hover {
    transform: scale(1.05);
  }

  .logo {
    height: var(--height-navbar);
    padding: 10px 0;
    display: block;
    cursor: pointer;
    transition: var(--transition);
    filter: brightness(0.9);
  }

  nav.dark-mode .logo {
    filter: brightness(9);
  }

  @media screen and (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-header {
      padding: 0;
    }
    .nav-center {
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: var(--height-navbar);
      width: var(--small-fluid-width);
      max-width: var(--max-nav-width);
    }
  }
`;
