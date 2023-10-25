import styled from 'styled-components';
import { CardItem } from '..';
import { projects } from '../../data/projectsData';

const ResearchProjects: React.FC = () => {
  return (
    <Wrapper className="ResearchProjects subsection-container">
      <h2 className="title">Research Projects:</h2>
      <div className="grid-container">
        {projects.map(({ title, img, description, id }) => {
          return (
            <CardItem
              key={id}
              title={title}
              img={img}
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
    display: grid;
    gap: var(--grid-gap);
    width: var(--fluid-width);
    max-width: var(--max-width);
    grid-template-columns: 1fr;
  }

  @media screen and (min-width: 992px) {
    .grid-container {
      grid-template-columns: repeat(4, 1fr);
      margin-top: 2rem;
    }
  }
`;
