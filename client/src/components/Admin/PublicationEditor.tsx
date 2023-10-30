/* eslint-disable react-refresh/only-export-components */
import { IPublication } from '../../utils/types';
import FullLineInput from './FullLineInput';
import { useState, createContext, useContext } from 'react';
import {
  AuthorsFormRow,
  ButtonStrip,
  CreateNewAuthorButton,
  DeleteItemConfirmationModal,
  JournalInfoFormRow,
  NewAuthorModal,
} from './';
import { Form } from 'react-router-dom';
import { usePublicationTypeContext } from './AdminPublicationType';

interface IContext {
  isEditDisabled: boolean;
  setIsEditDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  publication: IPublication;
  tempAuthorIds: string[];
  isNewAuthorModalVisible: boolean;
  setIsNewAuthorModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setTempAuthorIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const PublicationEditorContext = createContext<IContext>({} as IContext);

const PublicationEditor: React.FC<{
  publication: IPublication;
  publicationType: string;
  isNew?: boolean;
}> = ({ publication, publicationType, isNew = false }) => {
  const [isEditDisabled, setIsEditDisabled] = useState<boolean>(!isNew);
  // We use this state as the key for the form, forcing React to re-render it when we want to reset it, by increasing this index
  const [resetIdx, setResetIdx] = useState(0);
  const [isNewAuthorModalVisible, setIsNewAuthorModalVisible] = useState(false);
  const [
    isDeleteConfirmationModalVisible,
    setIsDeleteConfirmationModalVisible,
  ] = useState(false);
  const [tempAuthorIds, setTempAuthorIds] = useState([
    ...publication.authorIds,
  ]);

  const onClickDiscard = () => {
    setTempAuthorIds(publication.authorIds);
    setIsEditDisabled(true);
    setResetIdx(resetIdx + 1);
  };

  const onClickDelete = () => {
    setIsDeleteConfirmationModalVisible(true);
  };

  const { newPublications, setNewPublications } = usePublicationTypeContext();
  return (
    <PublicationEditorContext.Provider
      value={{
        isEditDisabled,
        setIsEditDisabled,
        publication,
        isNewAuthorModalVisible,
        setIsNewAuthorModalVisible,
        tempAuthorIds,
        setTempAuthorIds,
      }}
    >
      <>
        <Form
          className="editor-form"
          key={resetIdx}
          method={isNew ? 'post' : 'patch'}
        >
          <FullLineInput
            name="title"
            defaultValue={publication.title}
            label="Title"
            isEditDisabled={isEditDisabled}
          />
          <AuthorsFormRow />
          <CreateNewAuthorButton />
          <FullLineInput
            name="journal"
            defaultValue={publication.journal}
            label="Journal"
            isEditDisabled={isEditDisabled}
          />
          <JournalInfoFormRow publication={publication} />
          <input type="hidden" name="itemId" value={publication._id} />
          <input type="hidden" name="publicationType" value={publicationType} />
          <ButtonStrip
            onClickDiscard={onClickDiscard}
            onClickDelete={onClickDelete}
            isEditDisabled={isEditDisabled}
            setIsEditDisabled={setIsEditDisabled}
          />
        </Form>
        <NewAuthorModal
          isVisible={isNewAuthorModalVisible}
          setIsVisible={setIsNewAuthorModalVisible}
        />
        <DeleteItemConfirmationModal
          isConfirmationModalVisible={isDeleteConfirmationModalVisible}
          setIsConfirmationModalVisible={setIsDeleteConfirmationModalVisible}
          id={publication._id || ''}
          isNew={publication.isNew || false}
          endpoint="publications"
          queryKey={['publications']}
          newItems={newPublications}
          setNewItems={setNewPublications}
        />
      </>
    </PublicationEditorContext.Provider>
  );
};
export default PublicationEditor;

export const usePublicationEditorContext = () => {
  return useContext(PublicationEditorContext);
};
