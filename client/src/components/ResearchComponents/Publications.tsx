import styled from 'styled-components';
import { Introduction, PublicationsOfType } from '.';
import { publicationTypesQuery, publicationsQuery } from '../../utils/queries';
import { useQuery } from '@tanstack/react-query';

const Publications: React.FC = () => {
  const { data: publications } = useQuery(publicationsQuery);
  const { data: publicationTypes } = useQuery(publicationTypesQuery);

  if (!publications || !publicationTypes) {
    return <Wrapper>Loading...</Wrapper>;
  }

  return (
    <Wrapper className="Publications subsection-container">
      <h2 className="title">Publications:</h2>
      <Introduction />
      <div className="publications-container">
        {publicationTypes.map(({ type, label }) => {
          const publicationsCurrentType = publications.filter((pub) => {
            return pub.publicationType === type;
          });
          return (
            <PublicationsOfType
              key={type}
              label={label}
              publications={publicationsCurrentType}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};
export default Publications;

const Wrapper = styled.div`
  .text-link {
    font-weight: 700;
    text-decoration: underline;
    text-decoration-color: transparent;
    transition: text-decoration-color 0.2s ease-in-out;
  }

  .text-link:hover {
    text-decoration-color: inherit;
  }
`;
