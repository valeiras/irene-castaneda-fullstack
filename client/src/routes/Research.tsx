/* eslint-disable react-refresh/only-export-components */
import { QueryClient } from '@tanstack/react-query';
import { Fullpage } from '../components';
import {
  ResearchProjects,
  PublicationList,
} from '../components/ResearchComponents';
import {
  authorsQuery,
  publicationTypesQuery,
  publicationsQuery,
} from '../utils/queries';
import displayAxiosError from '../utils/displayAxiosError';
import { LoaderFunctionReturn } from '../utils/types';

export const loader: (queryClient: QueryClient) => LoaderFunctionReturn = (
  queryClient
) => {
  return async () => {
    try {
      await queryClient.ensureQueryData(publicationsQuery);
      await queryClient.ensureQueryData(publicationTypesQuery);
      await queryClient.ensureQueryData(authorsQuery);
      return 'ok';
    } catch (error) {
      displayAxiosError(error);
      return error;
    }
  };
};

const Research: React.FC = () => {
  return (
    <Fullpage heroClass="hero-container center-content">
      <ResearchProjects />
      <PublicationList />
    </Fullpage>
  );
};
export default Research;
