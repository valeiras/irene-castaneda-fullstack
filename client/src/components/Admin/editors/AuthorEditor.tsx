/* eslint-disable react-refresh/only-export-components */
import { IAuthor } from '../../../utils/types';
import { useState, createContext, useContext } from 'react';
import { ButtonStrip, DeleteItemConfirmationModal, FullLineInput } from '..';
import { Form } from 'react-router-dom';
import { useAuthorsContext } from '../../../routes/AdminAuthors';

interface IContext {
  isEditDisabled: boolean;
  setIsEditDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  author: IAuthor;
}

const AuthorEditorContext = createContext<IContext>({} as IContext);

const AuthorEditor: React.FC<{
  author: IAuthor;
  isNew?: boolean;
}> = ({ author, isNew = false }) => {
  const [isEditDisabled, setIsEditDisabled] = useState<boolean>(!isNew);
  // We use this state as the key for the form, forcing React to re-render it when we want to reset it, by increasing this index
  const [resetIdx, setResetIdx] = useState(0);
  const [
    isDeleteConfirmationModalVisible,
    setIsDeleteConfirmationModalVisible,
  ] = useState(false);

  const onClickDiscard = () => {
    setIsEditDisabled(true);
    setResetIdx(resetIdx + 1);
  };

  const onClickDelete = () => {
    setIsDeleteConfirmationModalVisible(true);
  };

  const { newAuthors, setNewAuthors } = useAuthorsContext();

  return (
    <AuthorEditorContext.Provider
      value={{
        isEditDisabled,
        setIsEditDisabled,
        author,
      }}
    >
      <>
        <Form
          className="editor-form"
          key={resetIdx}
          method={isNew ? 'post' : 'patch'}
        >
          <FullLineInput
            name="name"
            defaultValue={author.name}
            label="Name"
            isEditDisabled={isEditDisabled}
            isRequired={true}
          />
          <input type="hidden" name="itemId" value={author._id} />
          <ButtonStrip
            onClickDiscard={onClickDiscard}
            onClickDelete={onClickDelete}
            isEditDisabled={isEditDisabled}
            setIsEditDisabled={setIsEditDisabled}
          />
        </Form>
        <DeleteItemConfirmationModal
          isConfirmationModalVisible={isDeleteConfirmationModalVisible}
          setIsConfirmationModalVisible={setIsDeleteConfirmationModalVisible}
          id={author._id || ''}
          isNew={author.isNew || false}
          endpoint="authors"
          queryKey={['authors']}
          newItems={newAuthors}
          setNewItems={setNewAuthors}
        />
      </>
    </AuthorEditorContext.Provider>
  );
};
export default AuthorEditor;

export const usePublicationEditorContext = () => {
  return useContext(AuthorEditorContext);
};
