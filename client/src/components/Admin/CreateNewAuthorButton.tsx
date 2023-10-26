import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { usePublicationEditorContext } from './PublicationEditor';

const CreateNewAuthorButton = () => {
  const { isEditDisabled } = usePublicationEditorContext();
  return (
    <Wrapper className="CreateNewAuthorButton">
      <Link to="new_author">
        <button type="button" className="btn" disabled={isEditDisabled}>
          Create new author
        </button>
      </Link>
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
