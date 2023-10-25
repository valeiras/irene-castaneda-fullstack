import { Fullpage } from '../components';
import {
  ResearchProjects,
  Publications,
} from '../components/ResearchComponents';

const Research: React.FC = () => {
  return (
    <Fullpage heroClass="hero-container center-content">
      <ResearchProjects />
      <Publications />
    </Fullpage>
  );
};
export default Research;
