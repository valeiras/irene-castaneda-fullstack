import { IGlobalState, StateActions } from './types';
import {
  TOGGLE_DARK_MODE,
  SET_DARK_MODE,
  TOGGLE_SHOW_LINKS,
  SET_SHOW_LINKS,
  HIDE_FULLPAGE_IMG,
  SHOW_FULLPAGE_IMG,
} from './actionTypes';

const reducer = (state: IGlobalState, action: StateActions): IGlobalState => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return { ...state, isDarkMode: !state.isDarkMode };
      break;
    case SET_DARK_MODE:
      if (typeof action.payload === 'boolean') {
        return { ...state, isDarkMode: action.payload };
      } else {
        return { ...state };
      }
      break;
    case TOGGLE_SHOW_LINKS:
      return { ...state, showLinks: !state.showLinks };
      break;
    case SET_SHOW_LINKS:
      if (typeof action.payload === 'boolean') {
        return { ...state, showLinks: action.payload };
      } else {
        return { ...state };
      }
      break;
    case HIDE_FULLPAGE_IMG:
      document.body.style.overflow = 'auto';
      return { ...state, showFullpageImg: false };
      break;
    case SHOW_FULLPAGE_IMG:
      if (
        typeof action.payload === 'object' &&
        Object.prototype.hasOwnProperty.call(action.payload, 'img') &&
        Object.prototype.hasOwnProperty.call(action.payload, 'description')
      ) {
        document.body.style.overflow = 'hidden';
        return {
          ...state,
          showFullpageImg: true,
          currImg: action.payload.img,
          currDescription: action.payload.description,
        };
      } else {
        console.log(
          'Please provide img and description properties for the modal'
        );

        return { ...state };
      }

      break;
    default:
      return { ...state };
      break;
  }
};

export default reducer;
