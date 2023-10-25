import { titles, presentation, niceSentence } from '../data/homeData';
import picture from '../assets/imgs/Irene.jpg';
import { nanoid } from 'nanoid';
import { Fullpage } from '../components';
import styled from 'styled-components';

const Home: React.FC = () => {
  return (
    <Fullpage>
      <div className="block-container">
        {titles.map((title) => {
          return <p key={nanoid()}>{title}</p>;
        })}
      </div>
      <div className="block-container">
        <p>{presentation} </p>
      </div>
      <HomeGridContainer className="HomeGridContainer">
        <img src={picture} alt="Irene Castañeda" className="img" />
        <p className="nice-sentence">{niceSentence}</p>
      </HomeGridContainer>
    </Fullpage>
  );
};
export default Home;
const HomeGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: var(--fluid-width);
  max-width: var(--max-width);
  align-items: center;
  justify-items: center;
  gap: var(--grid-gap);

  @media screen and (min-width: 992px) {
    grid-template-columns: 1fr 2fr;
    gap: 4rem;

    p {
      font-size: 1.2rem;
    }
  }
`;
