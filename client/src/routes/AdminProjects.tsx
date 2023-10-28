/* eslint-disable react-refresh/only-export-components */
import { ActionFunctionReturn, LoaderFunctionReturn } from '../utils/types';
import type { QueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { projectsQuery } from '../utils/queries';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import displayAxiosError from '../utils/displayAxiosError';

export const loader: (queryClient: QueryClient) => LoaderFunctionReturn = (
  queryClient
) => {
  return async () => {
    try {
      await queryClient.ensureQueryData(projectsQuery);
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
      return await updateProject(formData, queryClient);
    } else if (request.method === 'POST') {
      return await createNewProject(formData, queryClient);
    }
  };
};

const updateProject = async (formData: FormData, queryClient: QueryClient) => {
  try {
    await customFetch.patch(`/projects/${formData.get('projectId')}`, formData);

    await queryClient.invalidateQueries({ queryKey: ['projects'] });
    toast.success('Project updated successfully!');
    return null;
  } catch (error) {
    displayAxiosError(error);
    return error;
  }
};

const createNewProject = async (
  formData: FormData,
  queryClient: QueryClient
) => {
  try {
    await customFetch.post(`/projects`, formData);
    await queryClient.invalidateQueries({ queryKey: ['projects'] });
    toast.success('Project created successfully!');
    return null;
  } catch (error) {
    displayAxiosError(error);
    return error;
  }
};

const AdminProjects: React.FC = () => {
  const { data: projects } = useQuery(projectsQuery);
  console.log(projects);

  return (
    <div className="AdminPublications hero-container" style={{ gap: '1rem' }}>
      <h1>Projects</h1>
      <div className="projects-container"></div>
    </div>
  );
};
export default AdminProjects;
