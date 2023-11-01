/* eslint-disable react-refresh/only-export-components */
import { IAuthor } from '../utils/types';
import { useQuery } from '@tanstack/react-query';
import { authorsQuery } from '../utils/queries';
import {
  getActionFunction,
  getCreateFunction,
  getLoaderFunction,
  getUpdateFunction,
} from '../utils/functionCreators';
import { createContext, useContext, useEffect, useState } from 'react';
import { AuthorEditor } from '../components/Admin';
import { nanoid } from 'nanoid';

interface IContext {
  newAuthors: IAuthor[];
  setNewAuthors: React.Dispatch<React.SetStateAction<IAuthor[]>>;
}
const AdminAuthorsContext = createContext<IContext>({} as IContext);

export const loader = getLoaderFunction({ queries: [authorsQuery] });

const updateAuthor = getUpdateFunction({
  apiEndpoint: 'authors',
  queryKey: 'authors',
  name: 'Author',
});

const createNewAuthor = getCreateFunction({
  apiEndpoint: 'authors',
  queryKey: 'authors',
  name: 'Author',
});

export const action = getActionFunction({
  update: updateAuthor,
  createNew: createNewAuthor,
});

const AdminAuthors: React.FC = () => {
  const { data: authors } = useQuery(authorsQuery);
  const [newAuthors, setNewAuthors] = useState<IAuthor[]>([]);

  useEffect(() => {
    setNewAuthors([]);
  }, [authors]);

  const addNewAuthor = () => {
    const emptyAuthor = {
      name: '',
      isNew: true,
      highlighted: false,
      _id: nanoid(),
    };
    newAuthors.unshift(emptyAuthor);
    setNewAuthors([...newAuthors]);
  };

  if (!authors) {
    return <>Loading...</>;
  }

  return (
    <AdminAuthorsContext.Provider
      value={{
        newAuthors,
        setNewAuthors,
      }}
    >
      <div className="AdminAuthors hero-container" style={{ gap: '1rem' }}>
        <div className="admin-items-container">
          <button type="button" className="btn" onClick={addNewAuthor}>
            Add new
          </button>
          {[...newAuthors, ...authors].map((aut) => {
            return (
              <AuthorEditor
                author={aut}
                key={aut._id}
                isNew={aut?.isNew || false}
              />
            );
          })}
        </div>
      </div>
    </AdminAuthorsContext.Provider>
  );
};
export default AdminAuthors;

export const useAuthorsContext = () => {
  return useContext(AdminAuthorsContext);
};
