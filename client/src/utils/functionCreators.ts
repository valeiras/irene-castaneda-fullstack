import type { QueryClient } from '@tanstack/react-query';
import customFetch from './customFetch';
import { toast } from 'react-toastify';
import displayAxiosError from './displayAxiosError';

type UpsertFunction = (
  formData: FormData,
  queryClient: QueryClient
) => Promise<unknown>;

type UpsertFunctionGetter = ({
  apiEndpoint,
  queryKey,
  name,
}: {
  apiEndpoint: string;
  queryKey: string;
  name: string;
}) => UpsertFunction;

export const getUpdateFunction: UpsertFunctionGetter = ({
  apiEndpoint,
  queryKey,
  name,
}) => {
  return async (formData: FormData, queryClient: QueryClient) => {
    try {
      await customFetch.patch(
        `/${apiEndpoint}/${formData.get('itemId')}`,
        formData
      );

      await queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast.success(`${name} updated successfully!`);
      return null;
    } catch (error) {
      displayAxiosError(error);
      return error;
    }
  };
};

export const getCreateFunction: UpsertFunctionGetter = ({
  apiEndpoint,
  queryKey,
  name,
}) => {
  return async (formData: FormData, queryClient: QueryClient) => {
    try {
      await customFetch.post(`/${apiEndpoint}`, formData);
      await queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast.success(`${name} created successfully!`);
      return null;
    } catch (error) {
      displayAxiosError(error);
      return error;
    }
  };
};

export const patchOrPost = ({
  queryClient,
  createNew,
  update,
}: {
  queryClient: QueryClient;
  createNew: UpsertFunction;
  update: UpsertFunction;
}) => {
  return async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    if (request.method === 'PATCH') {
      return await update(formData, queryClient);
    } else if (request.method === 'POST') {
      return await createNew(formData, queryClient);
    }
  };
};
