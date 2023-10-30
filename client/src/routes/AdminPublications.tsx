/* eslint-disable react-refresh/only-export-components */
import { AdminPublicationType } from '../components/Admin';
import { useQuery } from '@tanstack/react-query';
import {
  publicationsQuery,
  publicationTypesQuery,
  authorsQuery,
} from '../utils/queries';
import { Outlet } from 'react-router-dom';
import {
  getActionFunction,
  getCreateFunction,
  getLoaderFunction,
  getUpdateFunction,
} from '../utils/functionCreators';

export const loader = getLoaderFunction({
  queries: [authorsQuery, publicationsQuery, publicationTypesQuery],
});

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

export const action = getActionFunction({
  createNew: createNewPublication,
  update: updatePublication,
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
