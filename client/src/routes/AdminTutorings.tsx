/* eslint-disable react-refresh/only-export-components */
import { AdminTutoringType } from '../components/Admin';
import { useQuery } from '@tanstack/react-query';
import { tutoringsQuery, tutoringTypesQuery } from '../utils/queries';
import { Outlet } from 'react-router-dom';
import {
  getActionFunction,
  getCreateFunction,
  getLoaderFunction,
  getUpdateFunction,
} from '../utils/functionCreators';

export const loader = getLoaderFunction({
  queries: [tutoringsQuery, tutoringTypesQuery],
});

const updateTutoring = getUpdateFunction({
  apiEndpoint: 'tutorings',
  queryKey: 'tutorings',
  name: 'Tutoring',
});

const createNewTutoring = getCreateFunction({
  apiEndpoint: 'tutorings',
  queryKey: 'tutorings',
  name: 'Tutoring',
});

export const action = getActionFunction({
  createNew: createNewTutoring,
  update: updateTutoring,
});

const AdminTutorings: React.FC = () => {
  const { data: tutorings } = useQuery(tutoringsQuery);
  const { data: tutoringTypes } = useQuery(tutoringTypesQuery);

  if (!tutorings || !tutoringTypes) {
    return <div>Loading...</div>;
  }

  return (
    <div className="AdminTutorings hero-container" style={{ gap: '1rem' }}>
      <h1>Publications</h1>
      <div className="admin-items-container">
        {tutoringTypes.map(({ type, label }) => {
          const tutoringCurrentType = tutorings.filter((tut) => {
            return tut.tutoringType === type;
          });
          return (
            <AdminTutoringType
              key={type}
              type={type}
              label={label}
              tutorings={tutoringCurrentType}
            />
          );
        })}
      </div>
      <Outlet />
    </div>
  );
};
export default AdminTutorings;
