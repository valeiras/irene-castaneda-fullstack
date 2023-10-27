/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';
import customFetch from '../../../utils/customFetch';
import { Form } from 'react-router-dom';
import { Modal, InputElement } from '..';
import { useQueryClient } from '@tanstack/react-query';
import displayAxiosError from '../../../utils/displayAxiosError';
import { toast } from 'react-toastify';
import { useRef } from 'react';

const NewAuthorModal: React.FC<{
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isVisible, setIsVisible }) => {
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);

  const createNewAuthor = async (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    evt.preventDefault();
    try {
      if (formRef.current) {
        const formData = new FormData(formRef.current);
        await customFetch.post('/authors', formData);
        await queryClient.invalidateQueries({ queryKey: ['authors'] });
        toast.success('Author created succesfully');
      } else {
        throw Error('We could not get the data from the form');
      }
    } catch (error) {
      displayAxiosError(error);
    }
  };

  return (
    <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
      <Wrapper>
        <h3>Create new author</h3>
        <Form className="new-author-form" method="post" ref={formRef}>
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
          <button
            type="button"
            className="btn btn-block"
            onClick={createNewAuthor}
          >
            Create
          </button>
        </Form>
      </Wrapper>
    </Modal>
  );
};
export default NewAuthorModal;

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
