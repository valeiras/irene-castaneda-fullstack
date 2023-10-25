import { HIDE_FULLPAGE_IMG } from '../assets/ts/actionTypes';
import { FaTimes } from 'react-icons/fa';
import useGlobalContext from '../hooks/useGlobalContext';
import styled from 'styled-components';

const FullpageImg = () => {
  const {
    globalState: { showFullpageImg, currImg, currDescription },
    dispatch,
  } = useGlobalContext();

  if (!showFullpageImg) return null;
  return (
    <Wrapper className="FullpageImg" style={{ top: window.scrollY }}>
      <div
        className="fullpage-img-container"
        style={{ backgroundImage: `url(${currImg})` }}
      ></div>
      <FaTimes
        className="close-fullpage-img-btn"
        onClick={() => {
          dispatch({ type: HIDE_FULLPAGE_IMG, payload: {} });
        }}
      />
      <div className="block-container">
        <p className="fullpage-img-description">{currDescription}</p>
      </div>
    </Wrapper>
  );
};
export default FullpageImg;

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 1000;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .fullpage-img-container {
    width: 100%;
    height: 100%;
    position: absolute;
    /* filter: grayscale(2) brightness(0.1) saturate(0.1); */
    filter: saturate(0.8) contrast(0.1) brightness(0.4);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: -1;
  }

  .close-fullpage-img-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.5rem;
    color: var(--grey-50);
    cursor: pointer;
    transition: var(--transition);
  }

  .close-fullpage-img-btn:hover {
    scale: 1.02;
  }

  .fullpage-img-description {
    font-size: 1.4rem;
    color: var(--grey-50);
    font-weight: 200;
    animation: fadein var(--transition-time) ease-in-out;
  }
`;
