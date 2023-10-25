import styled from 'styled-components';
import { Modal } from '..';
import { Form } from 'react-router-dom';
import { InputElement } from '../InputElement';
import { ACTION_INTENTS } from '../../../utils/constants';

const CreateNewAuthorModal: React.FC<{
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isVisible, setIsVisible }) => {
  return (
    <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
      <Wrapper>
        <h3>Create new author</h3>
        <Form
          className="new-author-form"
          method="post"
          // action="/createNewAuthor"
        >
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
          <input
            type="hidden"
            name="intent"
            value={ACTION_INTENTS.CREATE_NEW_AUTHOR}
          />
          <button type="submit" className="btn btn-block">
            Create
          </button>
        </Form>
      </Wrapper>
    </Modal>
  );
};
export default CreateNewAuthorModal;

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
