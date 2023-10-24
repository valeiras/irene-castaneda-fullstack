import { SHOW_MODAL } from '../assets/ts/actionTypes';
import useGlobalContext from '../hooks/useGlobalContext';

const CardItem: React.FC<{
  img: string;
  title: string;
  description: string;
}> = ({ img, title, description }) => {
  const { dispatch } = useGlobalContext();
  return (
    <div
      className="card-item-container"
      onClick={() => {
        dispatch({ type: SHOW_MODAL, payload: { img, description } });
      }}
    >
      <div
        className="card-item-img"
        style={{ backgroundImage: `url(${img})` }}
      ></div>
      <div className="card-item-title">{title}</div>
      <div className="card-item-over">{title}</div>
    </div>
  );
};
export default CardItem;
