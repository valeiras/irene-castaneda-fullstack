import styled from 'styled-components';
import { Modal } from '..';

const ConfirmationModal: React.FC<{
  message: string;
  acceptTag: string;
  rejectTag: string;
  onAccept: () => void;
  onReject: () => void;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  message,
  acceptTag,
  rejectTag,
  onAccept,
  onReject = () => {
    setIsVisible(false);
  },
  isVisible,
  setIsVisible,
}) => {
  if (isVisible) {
    return (
      <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
        <Wrapper>
          <h3>{message}</h3>
          <div className="buttons">
            <button onClick={onAccept} className="btn">
              {acceptTag}
            </button>
            <button className="btn" onClick={onReject}>
              {rejectTag}
            </button>
          </div>
        </Wrapper>
      </Modal>
    );
  } else {
    return null;
  }
};
export default ConfirmationModal;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

  .buttons {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    justify-content: center;
  }
  .btn {
    font-size: 1rem;
  }
`;
