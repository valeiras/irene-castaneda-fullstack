import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

const Modal: React.FC<{
  isVisible?: boolean;
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>> | null;
  children: React.ReactNode;
  onCrossButtonClick?: () => void | null;
}> = ({
  isVisible = true,
  setIsVisible = null,
  children,
  onCrossButtonClick = null,
}) => {
  if (onCrossButtonClick === null) {
    onCrossButtonClick = () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
      if (setIsVisible !== null) {
        setIsVisible(false);
      }
    };
  }

  if (isVisible) {
    return (
      <Wrapper className="Modal" style={{ top: 0 }}>
        <div className="modal-content">
          <FaTimes className="close-modal-btn" onClick={onCrossButtonClick} />
          {children}
        </div>
      </Wrapper>
    );
  } else {
    return null;
  }
};
export default Modal;

const Wrapper = styled.div`
  --modal-width-mobile: 90vw;
  --modal-height-mobile: 30vh;
  --modal-width-laptop: 40vw;
  --modal-height-laptop: 20vh;

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  position: fixed;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background-color: #0f0f0fe6;
  width: 100vw;
  height: 100vh;

  .modal-content {
    min-height: var(--modal-height-mobile);
    width: var(--modal-width-mobile);
    align-self: center;
    justify-self: center;
    margin: 0 auto;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    border-radius: var(--border-radius);
    gap: 1rem;
    background-color: var(--grey-100);
    position: relative;
  }

  .close-modal-btn {
    font-size: 1.5rem;
    cursor: pointer;
    transition: var(--transition);
    margin-left: auto;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }

  .close-modal-btn:hover {
    scale: 1.02;
  }

  @media screen and (min-width: 992px) {
    .modal-content {
      min-height: var(--modal-height-laptop);
      width: var(--modal-width-laptop);
    }
  }

  h3 {
    text-align: center;
    font-size: 1.2rem;
  }
`;
