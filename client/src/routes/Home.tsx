import { titles, presentation, niceSentence } from '../data/homeData';
import picture from '../assets/imgs/Irene.jpg';
import { nanoid } from 'nanoid';
import { Fullpage } from '../components';

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
      <div className="home-grid-container">
        <img src={picture} alt="Irene Castañeda" className="img" />
        <p className="nice-sentence">{niceSentence}</p>
      </div>
    </Fullpage>
  );
};
export default Home;
