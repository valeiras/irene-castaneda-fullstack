/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';
import { redirect, useNavigate } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { Form } from 'react-router-dom';
import { Modal, InputElement } from '../components/Admin';
import { QueryClient } from '@tanstack/react-query';
import { ActionFunctionReturn } from '../utils/types';

export const action: (queryClient: QueryClient) => ActionFunctionReturn = (
  queryClient
) => {
  return async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    await customFetch.post('/authors', formData);
    await queryClient.invalidateQueries({ queryKey: ['authors'] });
    return redirect('/admin/publications');
  };
};

const NewAuthorPage = () => {
  const navigate = useNavigate();

  return (
    <Modal
      onCrossButtonClick={() => {
        navigate('..');
      }}
    >
      <Wrapper>
        <h3>Create new author</h3>
        <Form className="new-author-form" method="post">
          <InputElement
            name="name"
            defaultValue=""
            label="Name"
            isRequired={true}
          />
          <InputElement name="link" defaultValue="" label="Url" />
          <InputElement
            name="highlighted"
            label="Highlighted"
            type="checkbox"
          />
          <button type="submit" className="btn btn-block">
            Create
          </button>
        </Form>
      </Wrapper>
    </Modal>
  );
};
export default NewAuthorPage;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

  .new-author-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
