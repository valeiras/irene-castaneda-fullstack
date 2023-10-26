/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';
import { IPublication } from '../../utils/types';
import { PublicationEditor } from '.';
import { createContext, useContext, useState } from 'react';
import { nanoid } from 'nanoid';

interface IContext {
  newPublications: IPublication[];
  setNewPublications: React.Dispatch<React.SetStateAction<IPublication[]>>;
}

const PublicationTypeContext = createContext<IContext>({} as IContext);

const AdminPublicationType: React.FC<{
  type: string;
  label: string;
  publications: IPublication[];
}> = ({ type, label, publications }) => {
  const [newPublications, setNewPublications] = useState<IPublication[]>([]);

  const addNewPublication = async () => {
    const emptyPublication = {
      title: '',
      year: '',
      authorIds: [],
      journal: '',
      pages: '',
      link: '',
      _id: nanoid(),
      isNew: true,
      publicationType: type,
    };
    newPublications.unshift(emptyPublication);
    setNewPublications([...newPublications]);
  };

  return (
    <PublicationTypeContext.Provider
      value={{
        newPublications,
        setNewPublications,
      }}
    >
      <Wrapper key={type} className="publication-type-container">
        <h3>{label}:</h3>
        <button type="button" className="btn" onClick={addNewPublication}>
          Add new
        </button>
        {[...newPublications, ...publications].map((pub) => {
          return (
            <PublicationEditor
              publication={pub}
              publicationType={type}
              key={pub._id}
              isNew={pub?.isNew || false}
            />
          );
        })}
      </Wrapper>
    </PublicationTypeContext.Provider>
  );
};
export default AdminPublicationType;

export const usePublicationTypeContext = () => {
  return useContext(PublicationTypeContext);
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
