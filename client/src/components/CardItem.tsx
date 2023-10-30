import styled from 'styled-components';
import { SHOW_FULLPAGE_IMG } from '../utils/actionTypes';
import useGlobalContext from '../hooks/useGlobalContext';

const CardItem: React.FC<{
  img: string;
  title: string;
  description: string;
}> = ({ img, title, description }) => {
  const { dispatch } = useGlobalContext();
  return (
    <Wrapper
      className="CardItem"
      onClick={() => {
        dispatch({ type: SHOW_FULLPAGE_IMG, payload: { img, description } });
      }}
    >
      <div
        className="card-item-img"
        style={{ backgroundImage: `url(${img})` }}
      ></div>
      <div className="card-item-title">{title}</div>
      <div className="card-item-over">{title}</div>
    </Wrapper>
  );
};
export default CardItem;
const Wrapper = styled.div`
  cursor: pointer;
  width: 100%;
  position: relative;
  border: 1px solid var(--text-color);
  border-radius: var(--borderRadius);
  overflow: hidden;
  box-shadow: var(--shadow-4);

  .card-item-img {
    width: 100%;
    padding-top: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .card-item-title {
    position: absolute;
    font-size: 1.2rem;
    text-align: center;
    background-color: var(--navbar-bg-color);
    padding: 0.5rem;
    min-height: calc(2em + 1rem);
    bottom: 0;
    width: 100%;
    opacity: 1;
    transition: var(--bg-transition), var(--opacity-transition);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-item-over {
    text-align: center;
    font-size: 1.4rem;
    text-transform: uppercase;
    padding: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: var(--opposite-bg-color);
    color: var(--opposite-text-color);
    opacity: 0;
    transition: var(--transition);
  }

  &:hover .card-item-over {
    opacity: 1;
  }

  &:hover .card-item-title {
    opacity: 0;
  }
`;
