/* eslint-disable react-refresh/only-export-components */
import { Fullpage } from '../components';
import {
  ResearchProjects,
  PublicationList,
} from '../components/ResearchComponents';
import {
  authorsQuery,
  projectsQuery,
  publicationTypesQuery,
  publicationsQuery,
} from '../utils/queries';
import { getLoaderFunction } from '../utils/functionCreators';

export const loader = getLoaderFunction({
  queries: [
    authorsQuery,
    publicationsQuery,
    publicationTypesQuery,
    projectsQuery,
  ],
});

const Research: React.FC = () => {
  return (
    <Fullpage heroClass="hero-container center-content">
      <ResearchProjects />
      <PublicationList />
    </Fullpage>
  );
};
export default Research;
