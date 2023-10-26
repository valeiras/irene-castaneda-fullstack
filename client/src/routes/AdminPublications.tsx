/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { ActionFunctionReturn } from '../utils/types';
import { PublicationEditor } from '../components/Admin';
import type { QueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import {
  publicationsQuery,
  publicationTypesQuery,
  authorsQuery,
} from '../utils/queries';

type LoaderFunctionReturn = () => Promise<unknown>;
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
      return error;
    }
  };
};

export const action: (queryClient: QueryClient) => ActionFunctionReturn = (
  queryClient
) => {
  return async ({ request }: { request: Request }) => {
    const formData = await request.formData();

    await queryClient.invalidateQueries({ queryKey: ['publications'] });
    return null;
  };
};

const AdminPublications: React.FC = () => {
  const { data: publications } = useQuery(publicationsQuery);
  const { data: publicationTypes } = useQuery(publicationTypesQuery);

  if (!publications || !publicationTypes) {
    return <Wrapper>Loading...</Wrapper>;
  }

  return (
    <Wrapper className="AdminPublications hero-container">
      <h1>Publications</h1>
      <div className="publications-container">
        {publicationTypes.map(({ type, label }) => {
          const publicationsCurrentType = publications.filter((pub) => {
            return pub.publicationType === type;
          });

          return (
            <div key={type} className="publication-type-container">
              <h3>{label}:</h3>
              {publicationsCurrentType?.map((pub) => {
                return (
                  <PublicationEditor publication={pub} key={pub._id}>
                    <Outlet />
                  </PublicationEditor>
                );
              })}
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};
export default AdminPublications;

const Wrapper = styled.div`
  gap: 1rem;

  .publications-container {
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .publication-type-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 1px solid blue;
  }
`;
