import { Fullpage } from '../components';
import {
  ResearchProjects,
  Publications,
} from '../components/ResearchComponents';

const Research: React.FC = () => {
  return (
    <Fullpage>
      <ResearchProjects />
      <Publications />
    </Fullpage>
  );
};
export default Research;
