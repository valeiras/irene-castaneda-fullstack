import { BsPlusCircle, BsPlusCircleDotted } from 'react-icons/bs';
import { useLoaderData } from 'react-router-dom';
import { IAuthor } from '../../utils/Interfaces';
import { usePublicationEditorContext } from './PublicationEditor';

const AuthorsFormRow: React.FC = () => {
  const { authors: allAuthors } = useLoaderData() as { authors: IAuthor[] };
  const {
    isDisabled,
    publication: { authorIds },
    setIsAddAuthorModalVisible,
  } = usePublicationEditorContext();

  return (
    <div className="full-line-editor-form-row">
      <label htmlFor="pubName" className="editor-form-label">
        Authors:
      </label>
      <div className="authors-container">
        {authorIds.map((authorId) => {
          const currAuthor = allAuthors.find(({ _id }) => {
            return _id === authorId;
          });
          return (
            <select
              name="author[]"
              key={authorId}
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
    </div>
  );
};
export default AuthorsFormRow;
