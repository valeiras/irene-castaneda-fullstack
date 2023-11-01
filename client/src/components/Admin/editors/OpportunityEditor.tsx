/* eslint-disable react-refresh/only-export-components */
import { IOpportunity } from '../../../utils/types';
import { useState, createContext, useContext } from 'react';
import { ButtonStrip, DeleteItemConfirmationModal, TextAreaInput } from '..';
import { Form } from 'react-router-dom';
import { useOpportunitiesContext } from '../../../routes/AdminOpportunities';

interface IContext {
  isEditDisabled: boolean;
  setIsEditDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  opportunity: IOpportunity;
}

const OpportunityEditorContext = createContext<IContext>({} as IContext);

const OpportunityEditor: React.FC<{
  opportunity: IOpportunity;
  isNew?: boolean;
}> = ({ opportunity, isNew = false }) => {
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

  const { newOpportunities, setNewOpportunities } = useOpportunitiesContext();

  return (
    <OpportunityEditorContext.Provider
      value={{
        isEditDisabled,
        setIsEditDisabled,
        opportunity,
      }}
    >
      <>
        <Form
          className="editor-form"
          key={resetIdx}
          method={isNew ? 'post' : 'patch'}
        >
          <TextAreaInput
            name="description"
            defaultValue={opportunity.description}
            label="Descrip."
            isEditDisabled={isEditDisabled}
            isRequired={true}
          />
          <input type="hidden" name="itemId" value={opportunity._id} />
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
          id={opportunity._id || ''}
          isNew={opportunity.isNew || false}
          endpoint="opportunities"
          queryKey={['opportunities']}
          newItems={newOpportunities}
          setNewItems={setNewOpportunities}
        />
      </>
    </OpportunityEditorContext.Provider>
  );
};
export default OpportunityEditor;

export const usePublicationEditorContext = () => {
  return useContext(OpportunityEditorContext);
};
