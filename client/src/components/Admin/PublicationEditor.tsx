/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';
import { IPublication } from '../../utils/Interfaces';
import FullLineFormRow from './FullLineFormRow';
import { useState, createContext, useContext } from 'react';

import {
  AuthorsFormRow,
  AddAuthorModal,
  ButtonStrip,
  JournalInfoFormRow,
} from './';
import { Form } from 'react-router-dom';

interface IContext {
  isDisabled: boolean;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isAddAuthorModalVisible: boolean;
  setIsAddAuthorModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  resetIdx: number;
  setResetIdx: React.Dispatch<React.SetStateAction<number>>;
  publication: IPublication;
}
const PublicationEditorContext = createContext<IContext>({} as IContext);
const PublicationEditor: React.FC<{ publication: IPublication }> = ({
  publication,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isAddAuthorModalVisible, setIsAddAuthorModalVisible] = useState(false);

  // We use this state as the key for the form, forcing React to re-render it when we want to reset it, by increasing this index
  const [resetIdx, setResetIdx] = useState(0);

  return (
    <PublicationEditorContext.Provider
      value={{
        isDisabled,
        setIsDisabled,
        isAddAuthorModalVisible,
        setIsAddAuthorModalVisible,
        resetIdx,
        setResetIdx,
        publication,
      }}
    >
      <Wrapper>
        <AddAuthorModal />
        <Form className="editor-form" key={resetIdx}>
          <FullLineFormRow
            name="title"
            defaultValue={publication.title}
            label="Title"
          />
          <AuthorsFormRow />
          <FullLineFormRow
            name="journal"
            defaultValue={publication.journal}
            label="Journal"
          />
          <JournalInfoFormRow publication={publication} />

          <ButtonStrip />
        </Form>
      </Wrapper>
    </PublicationEditorContext.Provider>
  );
};
export default PublicationEditor;

export const usePublicationEditorContext = () => {
  return useContext(PublicationEditorContext);
};

const Wrapper = styled.div`
  .authors-container {
    display: flex;
    align-items: center;
  }
`;
