/* eslint-disable react-refresh/only-export-components */
import { IPublication } from '../../utils/types';
import FullLineFormRow from './FullLineFormRow';
import { useState, createContext, useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { authorsQuery } from '../../utils/queries';
import {
  AuthorsFormRow,
  AddAuthorModal,
  ButtonStrip,
  JournalInfoFormRow,
} from './';
import { Form, useLocation } from 'react-router-dom';

interface IContext {
  isDisabled: boolean;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isAddAuthorModalVisible: boolean;
  setIsAddAuthorModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setHasNewAuthor: React.Dispatch<React.SetStateAction<boolean>>;
  resetIdx: number;
  setResetIdx: React.Dispatch<React.SetStateAction<number>>;
  publication: IPublication;
  tempAuthorIds: string[];
  setTempAuthorIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const PublicationEditorContext = createContext<IContext>({} as IContext);

const PublicationEditor: React.FC<{
  publication: IPublication;
  children: React.ReactNode;
}> = ({ publication, children }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isAddAuthorModalVisible, setIsAddAuthorModalVisible] = useState(false);
  const [hasNewAuthor, setHasNewAuthor] = useState(false);
  // We use this state as the key for the form, forcing React to re-render it when we want to reset it, by increasing this index
  const [resetIdx, setResetIdx] = useState(0);
  const [tempAuthorIds, setTempAuthorIds] = useState([
    ...publication.authorIds,
  ]);

  const { data: allAuthors } = useQuery(authorsQuery);
  const location = useLocation();

  useEffect(() => {
    if (
      hasNewAuthor &&
      location.pathname === '/admin/publications' &&
      allAuthors
    ) {
      tempAuthorIds.push(allAuthors[allAuthors.length - 1]._id);
      setTempAuthorIds(tempAuthorIds);
      setIsAddAuthorModalVisible(false);
      setHasNewAuthor(false);
    }
  }, [allAuthors, tempAuthorIds, hasNewAuthor, location.pathname]);

  return (
    <PublicationEditorContext.Provider
      value={{
        isDisabled,
        setIsDisabled,
        isAddAuthorModalVisible,
        setIsAddAuthorModalVisible,
        setHasNewAuthor,
        resetIdx,
        setResetIdx,
        publication,
        tempAuthorIds,
        setTempAuthorIds,
      }}
    >
      <>
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
        {children}
      </>
    </PublicationEditorContext.Provider>
  );
};
export default PublicationEditor;

export const usePublicationEditorContext = () => {
  return useContext(PublicationEditorContext);
};
