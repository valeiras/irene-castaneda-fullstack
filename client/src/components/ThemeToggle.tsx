import styled from 'styled-components';
import { TOGGLE_DARK_MODE } from '../assets/ts/actionTypes';
import useGlobalContext from '../hooks/useGlobalContext';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';

const ThemeToggle: React.FC = () => {
  const { globalState, dispatch } = useGlobalContext();
  return (
    <Wrapper className="ThemeToggle">
      <button
        className="dark-toggle"
        onClick={() => {
          dispatch({ type: TOGGLE_DARK_MODE, payload: {} });
        }}
      >
        {globalState.isDarkMode ? (
          <BsMoonFill className="toggle-icon" />
        ) : (
          <BsSunFill className="toggle-icon" />
        )}
      </button>
    </Wrapper>
  );
};
export default ThemeToggle;

const Wrapper = styled.div`
  display: flex;

  .dark-toggle {
    background: transparent;
    border-color: transparent;
    display: grid;
    place-items: center;
    cursor: pointer;
  }

  .toggle-icon {
    font-size: 1.5rem;
    color: var(--text-color);
  }
`;
