import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ConfirmationModal, Modal } from '..';
import customFetch from '../../../utils/customFetch';
import { usePublicationEditorContext } from '../PublicationEditor';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { usePublicationTypeContext } from '../AdminPublicationType';

const DeletePublicationConfirmationModal: React.FC<{
  isConfirmationModalVisible: boolean;
  setIsConfirmationModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isConfirmationModalVisible, setIsConfirmationModalVisible }) => {
  const { publication } = usePublicationEditorContext();
  const { newPublications, setNewPublications } = usePublicationTypeContext();

  const mutation = useMutation({
    mutationFn: () => {
      return customFetch.delete(`/publications/${publication._id}`);
    },
  });

  const queryClient = useQueryClient();

  const deletePublication = async () => {
    if (publication.isNew) {
      deletePublicationFromLocalArray();
    } else {
      await deletePublicationFromDatabase();
    }
  };

  const deletePublicationFromDatabase = async () => {
    try {
      await customFetch.delete(`/publications/${publication._id}`);
      await queryClient.invalidateQueries({ queryKey: ['publications'] });
      toast.success('Publication removed successfully');
      setIsConfirmationModalVisible(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.msg);
      } else {
        toast.error('Something went wrong...');
      }
      console.log(error);
    }
  };

  const deletePublicationFromLocalArray = () => {
    const filteredPublications = newPublications.filter((pub) => {
      return pub._id !== publication._id;
    });
    setNewPublications([...filteredPublications]);
  };

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
