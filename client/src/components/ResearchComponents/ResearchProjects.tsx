import { CardItem } from '..';
import { projects } from '../../data/projectsData';

const ResearchProjects: React.FC = () => {
  return (
    <div className="subsection-container">
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
    </div>
  );
};
export default ResearchProjects;
