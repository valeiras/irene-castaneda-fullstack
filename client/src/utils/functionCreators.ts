import { QueryClient } from '@tanstack/react-query';
import customFetch from './customFetch';
import { toast } from 'react-toastify';
import displayAxiosError from './displayAxiosError';
import { CustomQuery } from './queries';

type UpsertFunction = (
  formData: FormData,
  queryClient: QueryClient
) => Promise<unknown>;

export type ActionFunctionReturn = ({
  request,
}: {
  request: Request;
}) => Promise<unknown>;

export type LoaderFunctionReturn = () => Promise<unknown>;

type LoaderFunction = (queryClient: QueryClient) => LoaderFunctionReturn;
type ActionFunction = (queryClient: QueryClient) => ActionFunctionReturn;

type UpsertFunctionGetter = ({
  apiEndpoint,
  queryKey,
  name,
}: {
  apiEndpoint: string;
  queryKey: string;
  name: string;
}) => UpsertFunction;

type LoaderFunctionGetter = ({
  queries,
}: {
  queries: CustomQuery[];
}) => LoaderFunction;

type ActionFunctionGetter = ({
  update,
  createNew,
}: {
  update: UpsertFunction;
  createNew: UpsertFunction;
}) => ActionFunction;

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

export const getActionFunction: ActionFunctionGetter = ({
  update,
  createNew,
}) => {
  return (queryClient: QueryClient) => {
    return patchOrPost({
      queryClient,
      update,
      createNew,
    });
  };
};

export const getLoaderFunction: LoaderFunctionGetter = ({ queries }) => {
  return (queryClient: QueryClient) => {
    return async () => {
      try {
        for (const query of queries) {
          await queryClient.ensureQueryData(query);
        }
        return 'ok';
      } catch (error) {
        displayAxiosError(error);
        return error;
      }
    };
  };
};
