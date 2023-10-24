import { HIDE_MODAL } from '../assets/ts/actionTypes';
import { FaTimes } from 'react-icons/fa';
import useGlobalContext from '../hooks/useGlobalContext';

const Modal = () => {
  const {
    globalState: { showModal, currImg, currDescription },
    dispatch,
  } = useGlobalContext();

  if (!showModal) return null;
  return (
    <div className="modal-container" style={{ top: window.scrollY }}>
      <div
        className="modal-img-container"
        style={{ backgroundImage: `url(${currImg})` }}
      ></div>
      <FaTimes
        className="close-modal-btn"
        onClick={() => {
          dispatch({ type: HIDE_MODAL, payload: {} });
        }}
      />
      <div className="block-container">
        <p className="modal-description">{currDescription}</p>
      </div>
    </div>
  );
};
export default Modal;
