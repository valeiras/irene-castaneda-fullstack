import { Dispatch, ReactNode } from 'react';
import { TOGGLE_DARK_MODE, SET_DARK_MODE, SHOW_MODAL } from './actionTypes';

export interface IGlobalState {
  isDarkMode: boolean;
  showLinks: boolean;
  showModal: boolean;
  currImg: string;
  currDescription: string;
}

export interface IToggleBooleanValue {
  type: typeof TOGGLE_DARK_MODE;
  payload: Record<string, never>;
}

export interface ISetBooleanValue {
  type: typeof SET_DARK_MODE;
  payload: boolean;
}

export interface ISetModal {
  type: typeof SHOW_MODAL;
  payload: { img: string; description: string };
}

export interface ISection {
  name: string;
  id: number;
}

export interface IContactLink {
  name: string;
  url: string;
  icon: ReactNode;
  id: number;
}

export interface IProject {
  title: string;
  id: number;
  img: string;
  description: string;
}

export type StateActions = IToggleBooleanValue | ISetBooleanValue | ISetModal;

export type ContextType = {
  globalState: IGlobalState;
  dispatch: Dispatch<StateActions>;
};
