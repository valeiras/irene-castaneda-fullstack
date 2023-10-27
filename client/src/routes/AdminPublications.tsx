/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';
import { ActionFunctionReturn } from '../utils/types';
import { AdminPublicationType } from '../components/Admin';
import type { QueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import {
  publicationsQuery,
  publicationTypesQuery,
  authorsQuery,
} from '../utils/queries';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import displayAxiosError from '../utils/displayAxiosError';
import { Outlet } from 'react-router-dom';

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
      displayAxiosError(error);
      return error;
    }
  };
};

export const action: (queryClient: QueryClient) => ActionFunctionReturn = (
  queryClient
) => {
  return async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    if (request.method === 'PATCH') {
      return await updatePublication(formData, queryClient);
    } else if (request.method === 'POST') {
      return await createNewPublication(formData, queryClient);
    }
  };
};

const updatePublication = async (
  formData: FormData,
  queryClient: QueryClient
) => {
  try {
    await customFetch.patch(
      `/publications/${formData.get('publicationId')}`,
      formData
    );

    await queryClient.invalidateQueries({ queryKey: ['publications'] });
    toast.success('Publication updated successfully!');
    return null;
  } catch (error) {
    displayAxiosError(error);
    return error;
  }
};

const createNewPublication = async (
  formData: FormData,
  queryClient: QueryClient
) => {
  try {
    await customFetch.post(`/publications`, formData);
    await queryClient.invalidateQueries({ queryKey: ['publications'] });
    toast.success('Publication created successfully!');
    return null;
  } catch (error) {
    displayAxiosError(error);
    return error;
  }
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
`;
