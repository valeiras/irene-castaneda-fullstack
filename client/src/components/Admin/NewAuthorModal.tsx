import { ConfirmationModal } from './';
import { usePublicationEditorContext } from './PublicationEditor';

const NewAuthorModal: React.FC = () => {
  const { isModalVisible, setIsModalVisible } = usePublicationEditorContext();

  const createNewAuthor = () => {};
  const insertExistingAuthor = () => {};

  return (
    <ConfirmationModal
      message="Add author"
      acceptTag="Create new author"
      rejectTag="Insert existing author"
      onAccept={createNewAuthor}
      onReject={insertExistingAuthor}
      isVisible={isModalVisible}
      setIsVisible={setIsModalVisible}
    />
  );
};
export default NewAuthorModal;
