import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { Fullpage } from '../components';
import { getLoaderFunction } from '../utils/functionCreators';
import { opportunitiesQuery } from '../utils/queries';

// eslint-disable-next-line react-refresh/only-export-components
export const loader = getLoaderFunction({
  queries: [opportunitiesQuery],
});

const Opportunities: React.FC = () => {
  const { data: opportunities } = useQuery(opportunitiesQuery);
  if (!opportunities) return null;

  return (
    <Fullpage>
      <Wrapper>
        {opportunities.map(({ _id, description }) => {
          return <span key={_id}>{`${description}`}</span>;
        })}
      </Wrapper>
    </Fullpage>
  );
};
export default Opportunities;

const Wrapper = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;

  span {
    font-size: 1.2rem;
  }
`;
