import styled from 'styled-components';

import { AiFillEdit, AiFillSave, AiOutlineCloseCircle } from 'react-icons/ai';
import { usePublicationEditorContext } from './PublicationEditor';

const ButtonStrip: React.FC = () => {
  const { isDisabled, setIsDisabled, resetIdx, setResetIdx } =
    usePublicationEditorContext();

  if (isDisabled) {
    return (
      <Wrapper>
        <button
          type="button"
          className="invisible-btn"
          onClick={() => {
            setIsDisabled(false);
          }}
          key="toggleEdit"
        >
          <AiFillEdit />
        </button>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <button type="submit" className="invisible-btn" key="save">
          <AiFillSave />
        </button>

        <button
          type="button"
          className="invisible-btn"
          onClick={() => {
            setResetIdx(resetIdx + 1);
            setIsDisabled(true);
          }}
        >
          <AiOutlineCloseCircle />
        </button>
      </Wrapper>
    );
  }
};
export default ButtonStrip;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  button {
    font-size: 1.3rem;
  }
`;
