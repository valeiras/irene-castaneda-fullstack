import styled from 'styled-components';
import { Modal } from '..';
import { usePublicationEditorContext } from '../PublicationEditor';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { authorsQuery } from '../../../utils/queries';

const AddAuthorModal: React.FC = () => {
  const {
    isAddAuthorModalVisible,
    setIsAddAuthorModalVisible,
    setHasNewAuthor,
    tempAuthorIds,
    setTempAuthorIds,
  } = usePublicationEditorContext();

  const { data: allAuthors } = useQuery(authorsQuery);

  const insertExistingAuthor = () => {
    if (allAuthors) {
      tempAuthorIds.push(allAuthors[0]._id);
      setTempAuthorIds(tempAuthorIds);
    }
    setIsAddAuthorModalVisible(false);
  };

  if (isAddAuthorModalVisible) {
    return (
      <Modal
        isVisible={isAddAuthorModalVisible}
        setIsVisible={setIsAddAuthorModalVisible}
      >
        <Wrapper>
          <h3>Add author</h3>
          <div className="buttons">
            <Link
              to="new_author"
              className="btn"
              onClick={() => {
                setIsAddAuthorModalVisible(false);
                setHasNewAuthor(true);
              }}
            >
              Create new author
            </Link>
            <button className="btn" onClick={insertExistingAuthor}>
              Insert existing author
            </button>
          </div>
        </Wrapper>
      </Modal>
    );
  } else {
    return null;
  }
};
export default AddAuthorModal;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

  .buttons {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }
`;
