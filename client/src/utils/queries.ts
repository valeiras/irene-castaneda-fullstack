import customFetch from '../utils/customFetch';
import {
  IFetchPublications,
  IFetchPublicationTypes,
  IFetchAuthors,
} from './types';

export const authorsQuery = {
  queryKey: ['authors'],
  queryFn: async () => {
    const {
      data: { authors },
    } = await customFetch<IFetchAuthors>('authors');
    return authors;
  },
};

export const publicationsQuery = {
  queryKey: ['publications'],
  queryFn: async () => {
    const {
      data: { publications },
    } = await customFetch<IFetchPublications>('publications');
    return publications;
  },
};

export const publicationTypesQuery = {
  queryKey: ['publicationTypes'],
  queryFn: async () => {
    const {
      data: { publicationTypes },
    } = await customFetch<IFetchPublicationTypes>('publications/types');
    return publicationTypes;
  },
};
