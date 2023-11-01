/* eslint-disable react-refresh/only-export-components */
import { useQuery } from '@tanstack/react-query';
import { Fullpage } from '../components';
import { getLoaderFunction } from '../utils/functionCreators';
import { tutoringTypesQuery, tutoringsQuery } from '../utils/queries';

export const loader = getLoaderFunction({
  queries: [tutoringsQuery, tutoringTypesQuery],
});

const Teaching: React.FC = () => {
  const { data: tutorings } = useQuery(tutoringsQuery);
  const { data: tutoringTypes } = useQuery(tutoringTypesQuery);

  console.log(tutorings, tutoringTypes);
  if (!tutoringTypes || !tutorings) {
    return <div>Loading...</div>;
  }

  return (
    <Fullpage>
      <div className="subsection-container">
        {tutoringTypes?.map(({ type, label }) => {
          const currTypeTutorings = tutorings.filter(({ tutoringType }) => {
            return tutoringType === type;
          });
          if (currTypeTutorings.length === 0) {
            return null;
          }

          return (
            <div className="type-list-container">
              <h3>{label}:</h3>
              <ul className="type-container">
                {currTypeTutorings.map(({ year, students, description }) => {
                  return (
                    <li style={{ marker: year }}>{`${year}: ${
                      students || ''
                    } ${description}.`}</li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </Fullpage>
  );
};
export default Teaching;
