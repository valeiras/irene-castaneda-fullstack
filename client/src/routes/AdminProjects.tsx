/* eslint-disable react-refresh/only-export-components */
import { IProject } from '../utils/types';
import { useQuery } from '@tanstack/react-query';
import { projectsQuery } from '../utils/queries';
import {
  getActionFunction,
  getCreateFunction,
  getLoaderFunction,
  getUpdateFunction,
} from '../utils/functionCreators';
import { createContext, useContext, useEffect, useState } from 'react';
import { ProjectEditor } from '../components/Admin';
import { nanoid } from 'nanoid';

interface IContext {
  newProjects: IProject[];
  setNewProjects: React.Dispatch<React.SetStateAction<IProject[]>>;
}
const AdminProjectsContext = createContext<IContext>({} as IContext);

export const loader = getLoaderFunction({ queries: [projectsQuery] });

const updateProject = getUpdateFunction({
  apiEndpoint: 'projects',
  queryKey: 'projects',
  name: 'Project',
});

const createNewProject = getCreateFunction({
  apiEndpoint: 'projects',
  queryKey: 'projects',
  name: 'Project',
});

export const action = getActionFunction({
  update: updateProject,
  createNew: createNewProject,
});

const AdminProjects: React.FC = () => {
  const { data: projects } = useQuery(projectsQuery);
  const [newProjects, setNewProjects] = useState<IProject[]>([]);

  useEffect(() => {
    setNewProjects([]);
  }, [projects]);

  const addNewProject = () => {
    const emptyProject = {
      title: '',
      description: '',
      cloudinaryUrl: '',
      isNew: true,
      _id: nanoid(),
    };
    newProjects.unshift(emptyProject);
    setNewProjects([...newProjects]);
  };

  if (!projects) {
    return <>Loading...</>;
  }

  return (
    <AdminProjectsContext.Provider
      value={{
        newProjects,
        setNewProjects,
      }}
    >
      <div className="AdminProjects hero-container" style={{ gap: '1rem' }}>
        <h1>Projects</h1>
        <div className="admin-items-container">
          <button type="button" className="btn" onClick={addNewProject}>
            Add new
          </button>
          {[...newProjects, ...projects].map((proj) => {
            return (
              <ProjectEditor
                project={proj}
                key={proj._id}
                isNew={proj?.isNew || false}
              />
            );
          })}
        </div>
      </div>
    </AdminProjectsContext.Provider>
  );
};
export default AdminProjects;

export const useProjectsContext = () => {
  return useContext(AdminProjectsContext);
};
