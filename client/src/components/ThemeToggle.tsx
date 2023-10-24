import { TOGGLE_DARK_MODE } from '../assets/ts/actionTypes';
import useGlobalContext from '../hooks/useGlobalContext';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';

const ThemeToggle: React.FC = () => {
  const { globalState, dispatch } = useGlobalContext();
  return (
    <section className="toggle-container">
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
    </section>
  );
};
export default ThemeToggle;
