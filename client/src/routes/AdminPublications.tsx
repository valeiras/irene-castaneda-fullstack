/* eslint-disable react-refresh/only-export-components */
import { ActionFunctionReturn, LoaderFunctionReturn } from '../utils/types';
import { AdminPublicationType } from '../components/Admin';
import type { QueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import {
  publicationsQuery,
  publicationTypesQuery,
  authorsQuery,
} from '../utils/queries';
import displayAxiosError from '../utils/displayAxiosError';
import { Outlet } from 'react-router-dom';
import {
  getCreateFunction,
  getUpdateFunction,
  patchOrPost,
} from '../utils/functionCreators';

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

export const action: (queryClient: QueryClient) => ActionFunctionReturn = (
  queryClient
) => {
  return patchOrPost({
    queryClient,
    update: updatePublication,
    createNew: createNewPublication,
  });
};

const updatePublication = getUpdateFunction({
  apiEndpoint: 'publications',
  queryKey: 'publications',
  name: 'Publication',
});

const createNewPublication = getCreateFunction({
  apiEndpoint: 'publications',
  queryKey: 'publications',
  name: 'Publication',
});

const AdminPublications: React.FC = () => {
  const { data: publications } = useQuery(publicationsQuery);
  const { data: publicationTypes } = useQuery(publicationTypesQuery);

  if (!publications || !publicationTypes) {
    return <div>Loading...</div>;
  }

  return (
    <div className="AdminPublications hero-container" style={{ gap: '1rem' }}>
      <h1>Publications</h1>
      <div className="admin-items-container">
        {publicationTypes.map(({ type, label }) => {
          const publicationsCurrentType = publications.filter((pub) => {
            return pub.publicationType === type;
          });
          return (
            <AdminPublicationType
              key={type}
              type={type}
              label={label}
              publications={publicationsCurrentType}
            />
          );
        })}
      </div>
      <Outlet />
    </div>
  );
};
export default AdminPublications;
