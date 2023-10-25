import { ConfirmationModal, CreateNewAuthorModal } from '..';
import { usePublicationEditorContext } from '../PublicationEditor';
import { useState } from 'react';

const AddAuthorModal: React.FC = () => {
  const { isAddAuthorModalVisible, setIsAddAuthorModalVisible } =
    usePublicationEditorContext();
  const [isCreateNewAuthorModalVisible, setIsCreateNewAuthorModalVisible] =
    useState(false);

  const createNewAuthor = () => {
    setIsAddAuthorModalVisible(false);
    setIsCreateNewAuthorModalVisible(true);
  };
  const insertExistingAuthor = () => {};

  return (
    <>
      <ConfirmationModal
        message="Add author"
        acceptTag="Create new author"
        rejectTag="Insert existing author"
        onAccept={createNewAuthor}
        onReject={insertExistingAuthor}
        isVisible={isAddAuthorModalVisible}
        setIsVisible={setIsAddAuthorModalVisible}
      />
      <CreateNewAuthorModal
        isVisible={isCreateNewAuthorModalVisible}
        setIsVisible={setIsCreateNewAuthorModalVisible}
      />
    </>
  );
};
export default AddAuthorModal;
