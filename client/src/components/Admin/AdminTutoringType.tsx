/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';
import { ITutoring } from '../../utils/types';
import { TutoringEditor } from '.';
import { createContext, useContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

interface IContext {
  newTutorings: ITutoring[];
  setNewTutorings: React.Dispatch<React.SetStateAction<ITutoring[]>>;
}
const AdminTutoringTypeContext = createContext<IContext>({} as IContext);

const AdminTutoringType: React.FC<{
  type: string;
  label: string;
  tutorings: ITutoring[];
}> = ({ type, label, tutorings }) => {
  const [newTutorings, setNewTutorings] = useState<ITutoring[]>([]);

  useEffect(() => {
    setNewTutorings([]);
  }, [tutorings]);

  const addNewTutoring = () => {
    const emptyTutoring = {
      students: '',
      year: '',
      description: '',
      isNew: true,
      tutoringType: type,
      _id: nanoid(),
    };
    newTutorings.unshift(emptyTutoring);
    setNewTutorings([...newTutorings]);
  };

  return (
    <AdminTutoringTypeContext.Provider
      value={{
        newTutorings,
        setNewTutorings,
      }}
    >
      <Wrapper key={type} className="publicationTypeContainer">
        <h3>{label}:</h3>
        <button type="button" className="btn" onClick={addNewTutoring}>
          Add new
        </button>
        {[...newTutorings, ...tutorings].map((tut) => {
          return (
            <TutoringEditor
              tutoring={tut}
              tutoringType={type}
              key={tut._id}
              isNew={tut?.isNew || false}
            />
          );
        })}
      </Wrapper>
    </AdminTutoringTypeContext.Provider>
  );
};
export default AdminTutoringType;

export const useTutoringTypeContext = () => {
  return useContext(AdminTutoringTypeContext);
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
