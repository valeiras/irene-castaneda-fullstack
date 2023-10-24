import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useGlobalContext from '../hooks/useGlobalContext';
import sections from '../data/sections';
import { SET_SHOW_LINKS } from '../assets/ts/actionTypes';

const Navlinks: React.FC = () => {
  const {
    globalState: { showLinks },
    dispatch,
  } = useGlobalContext();

  const linksContainerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);

  const linkStyles = {
    height: showLinks
      ? `${linksRef.current?.getBoundingClientRect().height}px`
      : '0px',
  };

  const { pathname } = useLocation();
  return (
    <div className="links-container" ref={linksContainerRef} style={linkStyles}>
      <ul className="links" ref={linksRef}>
        {sections.map(({ name, id }) => {
          const path = `/${name}`;
          if (path === pathname) {
            return (
              <li
                className="current-section"
                key={id}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  dispatch({ type: SET_SHOW_LINKS, payload: false });
                }}
              >
                {name}
              </li>
            );
          } else {
            return (
              <Link to={path} key={id}>
                <li>{name}</li>
              </Link>
            );
          }
        })}
      </ul>
    </div>
  );
};
export default Navlinks;
