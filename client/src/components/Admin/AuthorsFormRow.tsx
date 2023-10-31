import styled from 'styled-components';
import { BsPlusCircle, BsPlusCircleDotted } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
import { usePublicationEditorContext } from './PublicationEditor';
import { nanoid } from 'nanoid';
import { authorsQuery } from '../../utils/queries';
import { useQuery } from '@tanstack/react-query';

const AuthorsFormRow: React.FC = () => {
  const { data: allAuthors } = useQuery(authorsQuery);
  const { isEditDisabled, tempAuthorIds, setTempAuthorIds } =
    usePublicationEditorContext();

  if (!allAuthors) {
    return <Wrapper>Loading...</Wrapper>;
  }

  const insertExistingAuthor = () => {
    if (allAuthors[0]._id) {
      tempAuthorIds.push(allAuthors[0]._id);
      setTempAuthorIds([...tempAuthorIds]);
    }
  };

  const removeAuthor = (authorId: string) => {
    const newAuthorIds = tempAuthorIds.filter((id) => id !== authorId);
    setTempAuthorIds([...newAuthorIds]);
  };
  return (
    <Wrapper className="AuthorsFormRow full-line-editor-form-row">
      <label htmlFor="pubName" className="editor-form-label">
        Authors:
      </label>
      <div className="authors-container">
        {tempAuthorIds.map((authorId, idx) => {
          const currAuthor = allAuthors.find(({ _id }) => {
            return _id === authorId;
          });
          return (
            <div key={nanoid()} className="author-select-container">
              <select
                name="authorIds"
                defaultValue={currAuthor?._id || ''}
                className="editor-form-select"
                disabled={isEditDisabled}
                onChange={(evt) => {
                  tempAuthorIds[idx] = evt.target.value;
                  setTempAuthorIds(tempAuthorIds);
                }}
              >
                {allAuthors.map((author) => {
                  return (
                    <option key={author._id} value={author._id}>
                      {author.name}
                    </option>
                  );
                })}
              </select>
              <button
                type="button"
                className="invisible-btn remove-author-btn"
                disabled={isEditDisabled}
                onClick={() => {
                  removeAuthor(authorId);
                }}
              >
                <AiFillDelete />
              </button>
            </div>
          );
        })}
        <button
          type="button"
          className="invisible-btn"
          disabled={isEditDisabled}
          onClick={insertExistingAuthor}
        >
          {isEditDisabled ? <BsPlusCircleDotted /> : <BsPlusCircle />}
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

  .author-select-container {
    position: relative;
  }

  .author-select-container:hover .remove-author-btn:not(:disabled) {
    display: flex;
    opacity: 1;
    transition: var(--transition);
  }

  .remove-author-btn {
    align-items: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: none;
    color: var(--grey-700);
  }
`;
