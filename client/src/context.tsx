import { createContext, useReducer, useEffect } from 'react';
import { IGlobalState, ContextType } from './assets/ts/types';
import reducer from './assets/ts/reducer';

const initialState: IGlobalState = {
  isDarkMode: false,
  showLinks: false,
  showModal: false,
  currImg: '',
  currDescription: '',
};

export const GlobalContext = createContext<ContextType>({
  globalState: initialState,
  dispatch: () => null,
});

export const GlobalContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [globalState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', globalState.isDarkMode);
    document
      .querySelector('nav')
      ?.classList.toggle('dark-mode', globalState.isDarkMode);
  }, [globalState.isDarkMode]);

  return (
    <GlobalContext.Provider
      value={{
        globalState,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
