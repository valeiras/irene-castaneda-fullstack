/* eslint-disable react-refresh/only-export-components */
import { IPublication } from '../../utils/types';
import FullLineFormRow from './FullLineFormRow';
import { useState, createContext, useContext } from 'react';
import {
  AuthorsFormRow,
  ButtonStrip,
  CreateNewAuthorButton,
  JournalInfoFormRow,
} from './';
import { Form } from 'react-router-dom';

interface IContext {
  isEditDisabled: boolean;
  setIsEditDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  resetIdx: number;
  setResetIdx: React.Dispatch<React.SetStateAction<number>>;
  publication: IPublication;
  tempAuthorIds: string[];
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
  const [tempAuthorIds, setTempAuthorIds] = useState([
    ...publication.authorIds,
  ]);

  return (
    <PublicationEditorContext.Provider
      value={{
        isEditDisabled,
        setIsEditDisabled,
        resetIdx,
        setResetIdx,
        publication,
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
          <FullLineFormRow
            name="title"
            defaultValue={publication.title}
            label="Title"
          />
          <AuthorsFormRow />
          <CreateNewAuthorButton />
          <FullLineFormRow
            name="journal"
            defaultValue={publication.journal}
            label="Journal"
          />
          <JournalInfoFormRow publication={publication} />
          <input type="hidden" name="publicationId" value={publication._id} />
          <input type="hidden" name="publicationType" value={publicationType} />
          <ButtonStrip />
        </Form>
      </>
    </PublicationEditorContext.Provider>
  );
};
export default PublicationEditor;

export const usePublicationEditorContext = () => {
  return useContext(PublicationEditorContext);
};
