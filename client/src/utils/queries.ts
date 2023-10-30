import customFetch from '../utils/customFetch';
import {
  IFetchPublications,
  IFetchPublicationTypes,
  IFetchAuthors,
  IFetchProjects,
  IPublication,
  IAuthor,
  IPublicationType,
  IProject,
} from './types';

type AuthorsQuery = {
  queryKey: string[];
  queryFn: () => Promise<IAuthor[]>;
};
type ProjectsQuery = {
  queryKey: string[];
  queryFn: () => Promise<IProject[]>;
};
type PublicationsQuery = {
  queryKey: string[];
  queryFn: () => Promise<IPublication[]>;
};
type PublicationTypesQuery = {
  queryKey: string[];
  queryFn: () => Promise<IPublicationType[]>;
};
export type CustomQuery = {
  queryKey: string[];
  queryFn: () => Promise<
    IPublicationType[] | IPublication[] | IAuthor[] | IProject[]
  >;
};

export const authorsQuery: AuthorsQuery = {
  queryKey: ['authors'],
  queryFn: async () => {
    const {
      data: { authors },
    } = await customFetch<IFetchAuthors>('authors');
    return authors;
  },
};

export const publicationsQuery: PublicationsQuery = {
  queryKey: ['publications'],
  queryFn: async () => {
    const {
      data: { publications },
    } = await customFetch<IFetchPublications>('publications');
    return publications;
  },
};

export const publicationTypesQuery: PublicationTypesQuery = {
  queryKey: ['publicationTypes'],
  queryFn: async () => {
    const {
      data: { publicationTypes },
    } = await customFetch<IFetchPublicationTypes>('publications/types');
    return publicationTypes;
  },
};

export const projectsQuery: ProjectsQuery = {
  queryKey: ['projects'],
  queryFn: async () => {
    const {
      data: { projects },
    } = await customFetch<IFetchProjects>('projects');
    return projects;
  },
};
