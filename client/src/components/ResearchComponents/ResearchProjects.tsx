import styled from 'styled-components';
import { CardItem } from '..';
import { useQuery } from '@tanstack/react-query';
import { projectsQuery } from '../../utils/queries';

const ResearchProjects: React.FC = () => {
  const { data: projects } = useQuery(projectsQuery);
  if (!projects) {
    return null;
  }

  return (
    <Wrapper className="ResearchProjects subsection-container">
      <h2 className="title">Research Projects:</h2>
      <div className="grid-container">
        {projects.map(({ title, cloudinaryUrl, description, _id }) => {
          return (
            <CardItem
              key={_id}
              title={title}
              imgUrl={cloudinaryUrl}
              description={description}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};
export default ResearchProjects;
const Wrapper = styled.div`
  .grid-container {
    width: 100%;
    display: grid;
    gap: var(--grid-gap);
    grid-template-columns: 1fr;
  }

  @media screen and (min-width: 992px) {
    .grid-container {
      grid-template-columns: repeat(2, 1fr);
      margin-top: 2rem;
    }
  }

  @media screen and (min-width: 1200px) {
    .grid-container {
      grid-template-columns: repeat(4, 1fr);
      margin-top: 2rem;
    }
  }
`;
