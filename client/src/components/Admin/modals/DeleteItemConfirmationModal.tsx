import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ConfirmationModal, Modal } from '..';
import customFetch from '../../../utils/customFetch';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { IAuthor, IProject, IPublication } from '../../../utils/types';

const DeleteItemConfirmationModal: React.FC<{
  isConfirmationModalVisible: boolean;
  setIsConfirmationModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  isNew: boolean;
  endpoint: string;
  queryKey: string[];
  newItems: (IPublication | IProject | IAuthor)[];
  setNewItems:
    | React.Dispatch<React.SetStateAction<IPublication[]>>
    | React.Dispatch<React.SetStateAction<IProject[]>>
    | React.Dispatch<React.SetStateAction<IAuthor[]>>;
}> = ({
  isConfirmationModalVisible,
  setIsConfirmationModalVisible,
  id,
  isNew,
  endpoint,
  queryKey,
  newItems,
  setNewItems,
}) => {
  const mutation = useMutation({
    mutationFn: () => {
      return customFetch.delete(`/${endpoint}/${id}`);
    },
  });

  const queryClient = useQueryClient();

  const deleteItem = async () => {
    if (isNew) {
      deleteItemFromLocalArray();
    } else {
      await deleteItemFromDatabase();
    }
  };

  const deleteItemFromDatabase = async () => {
    try {
      await customFetch.delete(`/${endpoint}/${id}`);
      await queryClient.invalidateQueries({ queryKey });
      toast.success('Item removed successfully');
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

  const deleteItemFromLocalArray = () => {
    const filteredItems = newItems.filter((it) => {
      return it._id !== id;
    });

    // We force the conversion to a typed dispatch function. If the types do not match we will get an error
    const setTypedNewItems = setNewItems as React.Dispatch<
      React.SetStateAction<typeof newItems>
    >;
    setTypedNewItems([...filteredItems]);
  };

  if (
    mutation.status === 'pending' ||
    queryClient.getQueryState(queryKey)?.fetchStatus === 'fetching'
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
      message="Are you sure you want to remove this item?"
      acceptTag="Yes!"
      rejectTag="I'd rather not"
      onAccept={deleteItem}
      onReject={() => {
        setIsConfirmationModalVisible(false);
      }}
      isVisible={isConfirmationModalVisible}
      setIsVisible={setIsConfirmationModalVisible}
    />
  );
};
export default DeleteItemConfirmationModal;
