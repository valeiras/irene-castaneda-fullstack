import styled from 'styled-components';
import { usePublicationEditorContext } from './PublicationEditor';
import { useAdminPublicationsContext } from '../../routes/AdminPublications';

const CreateNewAuthorButton = () => {
  const { setIsNewAuthorModalVisible } = useAdminPublicationsContext();
  const { isEditDisabled } = usePublicationEditorContext();
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
  padding-left: 4.2rem;
`;
