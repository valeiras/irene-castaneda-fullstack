export interface IPublication {
  title: string;
  year: string;
  authorIds: string[];
  journal: string;
  pages?: string;
  link?: string;
  isNew?: boolean;
  publicationType: string;
  _id?: string;
}

export interface IPublicationType {
  type: string;
  label: string;
}

export interface ITutoring {
  students: string;
  year: string;
  description: string;
  isNew?: boolean;
  tutoringType: string;
  _id?: string;
}

export interface ITutoringType {
  type: string;
  label: string;
}

export interface IAuthor {
  name: string;
  link?: string;
  highlighted: boolean;
  isNew?: boolean;
  _id?: string;
}

export interface IProject {
  title: string;
  description: string;
  cloudinaryUrl: string;
  isNew?: boolean;
  _id?: string;
}

export interface IFetchPublications {
  publications: IPublication[];
}

export interface IFetchPublicationTypes {
  publicationTypes: IPublicationType[];
}

export interface IFetchAuthors {
  authors: IAuthor[];
}

export interface IFetchProjects {
  projects: IProject[];
}

export interface IFetchTutorings {
  tutorings: ITutoring[];
}

export interface IFetchTutoringTypes {
  tutoringTypes: ITutoringType[];
}

import { Dispatch, ReactNode } from 'react';
import {
  TOGGLE_DARK_MODE,
  SET_DARK_MODE,
  SHOW_FULLPAGE_IMG,
} from './actionTypes';

export interface IGlobalState {
  isDarkMode: boolean;
  showLinks: boolean;
  showFullpageImg: boolean;
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

export interface ISetFullpageImg {
  type: typeof SHOW_FULLPAGE_IMG;
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
export type StateActions =
  | IToggleBooleanValue
  | ISetBooleanValue
  | ISetFullpageImg;

export type ContextType = {
  globalState: IGlobalState;
  dispatch: Dispatch<StateActions>;
};
