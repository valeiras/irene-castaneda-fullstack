import styled from 'styled-components';
import { usePublicationEditorContext } from './editors/PublicationEditor';

const CreateNewAuthorButton = () => {
  const { isEditDisabled, setIsNewAuthorModalVisible } =
    usePublicationEditorContext();
  return (
    <Wrapper className="CreateNewAuthorButton">
      <button
        type="button"
        className="btn"
        disabled={isEditDisabled}
        onClick={() => {
          setIsNewAuthorModalVisible(true);
        }}
      >
        Create new author
      </button>
    </Wrapper>
  );
};
export default CreateNewAuthorButton;
const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: left;
  padding-left: var(--label-width);
`;
