import styled from 'styled-components';
import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import useGlobalContext from '../hooks/useGlobalContext';
import { SET_SHOW_LINKS } from '../assets/ts/actionTypes';
import { ISection } from '../assets/ts/types';

const Navlinks: React.FC<{ sections: ISection[] }> = ({ sections }) => {
  const {
    globalState: { showLinks },
    dispatch,
  } = useGlobalContext();

  const linksContainerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const linkStyles = {
    height: showLinks
      ? `${linksRef.current?.getBoundingClientRect().height}px`
      : '0px',
  };

  return (
    <Wrapper ref={linksContainerRef} style={linkStyles} className="NavLinks">
      <div className="links-container" ref={linksRef}>
        {sections.map(({ name, id }) => {
          return (
            <NavLink
              to={name}
              key={id}
              className="link"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                dispatch({ type: SET_SHOW_LINKS, payload: false });
              }}
            >
              {name}
            </NavLink>
          );
        })}
      </div>
    </Wrapper>
  );
};
export default Navlinks;

const Wrapper = styled.div`
  align-self: stretch;
  display: flex;
  align-items: center;
  overflow: hidden;
  transition: var(--height-transition);

  .link {
    font-size: 1.2rem;
    text-transform: capitalize;
    display: block;
    padding: 0.5rem 0;
    transition: var(--transition);
    cursor: pointer;
  }

  .link:hover {
    color: var(--text-color-hover);
    padding-left: 0.5rem;
  }

  @media screen and (min-width: 992px) {
    height: auto !important;

    .links-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 50vw;
    }
    .link {
      padding: 0.4rem;
      border: 1px solid transparent;
      border-radius: 10px;
    }

    .link:hover {
      padding: 0.4rem;
    }

    .link.active {
      border: 1px solid var(--grey-500);
      box-sizing: content-box;
    }
  }
`;
