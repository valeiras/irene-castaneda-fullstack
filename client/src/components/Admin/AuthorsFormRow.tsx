import styled from 'styled-components';
import { BsPlusCircle, BsPlusCircleDotted } from 'react-icons/bs';
import { usePublicationEditorContext } from './PublicationEditor';
import { nanoid } from 'nanoid';
import { authorsQuery } from '../../utils/queries';
import { useQuery } from '@tanstack/react-query';

const AuthorsFormRow: React.FC = () => {
  const { data: allAuthors } = useQuery(authorsQuery);
  const { isDisabled, tempAuthorIds, setIsAddAuthorModalVisible } =
    usePublicationEditorContext();

  if (!allAuthors) {
    return <Wrapper>Loading...</Wrapper>;
  }

  return (
    <Wrapper className="AuthorsFormRow full-line-editor-form-row">
      <label htmlFor="pubName" className="editor-form-label">
        Authors:
      </label>
      <div className="authors-container">
        {tempAuthorIds.map((authorId) => {
          const currAuthor = allAuthors.find(({ _id }) => {
            return _id === authorId;
          });
          return (
            <select
              name="author[]"
              key={nanoid()}
              defaultValue={currAuthor?.name || ''}
              className="editor-form-select"
              disabled={isDisabled}
            >
              {allAuthors.map((author) => {
                return <option key={author._id}>{author.name}</option>;
              })}
            </select>
          );
        })}
        <button
          type="button"
          className="invisible-btn"
          disabled={isDisabled}
          onClick={() => {
            setIsAddAuthorModalVisible(true);
          }}
        >
          {isDisabled ? <BsPlusCircleDotted /> : <BsPlusCircle />}
        </button>
      </div>
    </Wrapper>
  );
};
export default AuthorsFormRow;
const Wrapper = styled.div`
  .authors-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
`;
