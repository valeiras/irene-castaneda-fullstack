import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ConfirmationModal, Modal } from '..';
import customFetch from '../../../utils/customFetch';
import { usePublicationEditorContext } from '../PublicationEditor';

const DeletePublicationConfirmationModal: React.FC<{
  isConfirmationModalVisible: boolean;
  setIsConfirmationModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isConfirmationModalVisible, setIsConfirmationModalVisible }) => {
  const { publication } = usePublicationEditorContext();

  const mutation = useMutation({
    mutationFn: () => {
      return customFetch.delete(`/publications/${publication._id}`);
    },
  });
  const queryClient = useQueryClient();

  const deletePublication = async () => {
    await mutation.mutateAsync();
    await queryClient.invalidateQueries({ queryKey: ['publications'] });
    setIsConfirmationModalVisible(false);
  };

  console.log(queryClient.getQueryState(['publications'])?.fetchStatus);

  if (
    mutation.status === 'pending' ||
    queryClient.getQueryState(['publications'])?.fetchStatus === 'fetching'
  ) {
    return (
      <Modal>
        <span>Deleting...</span>
        <div className="small-loading"></div>
      </Modal>
    );
  }

  return (
    <ConfirmationModal
      message="Are you sure you want to remove this publication?"
      acceptTag="Yes!"
      rejectTag="I'd rather not"
      onAccept={deletePublication}
      onReject={() => {
        setIsConfirmationModalVisible(false);
      }}
      isVisible={isConfirmationModalVisible}
      setIsVisible={setIsConfirmationModalVisible}
    />
  );
};
export default DeletePublicationConfirmationModal;
