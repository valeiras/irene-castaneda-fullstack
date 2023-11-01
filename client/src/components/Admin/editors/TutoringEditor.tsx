/* eslint-disable react-refresh/only-export-components */
import { ITutoring } from '../../../utils/types';
import FullLineInput from '../FullLineInput';
import { useState, createContext, useContext } from 'react';
import {
  ButtonStrip,
  DeleteItemConfirmationModal,
  InputElement,
  TextAreaInput,
} from '..';
import { Form } from 'react-router-dom';
import { useTutoringTypeContext } from '../AdminTutoringType';

interface IContext {
  isEditDisabled: boolean;
  setIsEditDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  tutoring: ITutoring;
}

const TutoringEditorContext = createContext<IContext>({} as IContext);

const TutoringEditor: React.FC<{
  tutoring: ITutoring;
  tutoringType: string;
  isNew?: boolean;
}> = ({ tutoring, tutoringType, isNew = false }) => {
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

  const { newTutorings, setNewTutorings } = useTutoringTypeContext();

  return (
    <TutoringEditorContext.Provider
      value={{
        isEditDisabled,
        setIsEditDisabled,
        tutoring,
      }}
    >
      <>
        <Form
          className="editor-form"
          key={resetIdx}
          method={isNew ? 'post' : 'patch'}
        >
          {tutoringType !== 'teaching' && (
            <FullLineInput
              name="students"
              defaultValue={tutoring.students}
              label="Students"
              isEditDisabled={isEditDisabled}
              isRequired={true}
            />
          )}
          <TextAreaInput
            name="description"
            defaultValue={tutoring.description}
            label="Descrip."
            isEditDisabled={isEditDisabled}
            isRequired={true}
          />
          <InputElement
            name="year"
            defaultValue={tutoring.year}
            isEditDisabled={isEditDisabled}
            label="year"
            isRequired={true}
          />
          <input type="hidden" name="itemId" value={tutoring._id} />
          <input type="hidden" name="tutoringType" value={tutoringType} />
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
          id={tutoring._id || ''}
          isNew={tutoring.isNew || false}
          endpoint="tutorings"
          queryKey={['tutorings']}
          newItems={newTutorings}
          setNewItems={setNewTutorings}
        />
      </>
    </TutoringEditorContext.Provider>
  );
};
export default TutoringEditor;

export const usePublicationEditorContext = () => {
  return useContext(TutoringEditorContext);
};
