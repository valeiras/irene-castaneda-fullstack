/* eslint-disable react-refresh/only-export-components */
import { IOpportunity } from '../utils/types';
import { useQuery } from '@tanstack/react-query';
import { opportunitiesQuery } from '../utils/queries';
import {
  getActionFunction,
  getCreateFunction,
  getLoaderFunction,
  getUpdateFunction,
} from '../utils/functionCreators';
import { createContext, useContext, useEffect, useState } from 'react';
import { OpportunityEditor } from '../components/Admin';
import { nanoid } from 'nanoid';

interface IContext {
  newOpportunities: IOpportunity[];
  setNewOpportunities: React.Dispatch<React.SetStateAction<IOpportunity[]>>;
}
const AdminOpportunitiesContext = createContext<IContext>({} as IContext);

export const loader = getLoaderFunction({ queries: [opportunitiesQuery] });

const updateOpportunity = getUpdateFunction({
  apiEndpoint: 'opportunities',
  queryKey: 'opportunities',
  name: 'Opportunity',
});

const createNewOpportunity = getCreateFunction({
  apiEndpoint: 'opportunities',
  queryKey: 'opportunities',
  name: 'Opportunity',
});

export const action = getActionFunction({
  update: updateOpportunity,
  createNew: createNewOpportunity,
});

const AdminOpportunities: React.FC = () => {
  const { data: opportunities } = useQuery(opportunitiesQuery);
  const [newOpportunities, setNewOpportunities] = useState<IOpportunity[]>([]);

  useEffect(() => {
    setNewOpportunities([]);
  }, [opportunities]);

  const addNewOpportunity = () => {
    const emptyOpportunity = {
      description: '',
      isNew: true,
      _id: nanoid(),
    };
    newOpportunities.unshift(emptyOpportunity);
    setNewOpportunities([...newOpportunities]);
  };

  if (!opportunities) {
    return <>Loading...</>;
  }

  return (
    <AdminOpportunitiesContext.Provider
      value={{
        newOpportunities,
        setNewOpportunities,
      }}
    >
      <div
        className="AdminOpportunities hero-container"
        style={{ gap: '1rem' }}
      >
        <div className="admin-items-container">
          <button type="button" className="btn" onClick={addNewOpportunity}>
            Add new
          </button>
          {[...newOpportunities, ...opportunities].map((opp) => {
            return (
              <OpportunityEditor
                opportunity={opp}
                key={opp._id}
                isNew={opp?.isNew || false}
              />
            );
          })}
        </div>
      </div>
    </AdminOpportunitiesContext.Provider>
  );
};
export default AdminOpportunities;

export const useOpportunitiesContext = () => {
  return useContext(AdminOpportunitiesContext);
};
