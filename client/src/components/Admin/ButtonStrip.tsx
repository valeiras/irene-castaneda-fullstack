import styled from 'styled-components';
import {
  AiFillEdit,
  AiFillSave,
  AiOutlineUndo,
  AiFillDelete,
} from 'react-icons/ai';
import { useEffect } from 'react';
import { useNavigation } from 'react-router-dom';
import { nanoid } from 'nanoid';

const ButtonStrip: React.FC<{
  isEditDisabled: boolean;
  setIsEditDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  onClickDelete: () => void;
  onClickDiscard: () => void;
}> = ({ isEditDisabled, setIsEditDisabled, onClickDelete, onClickDiscard }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  useEffect(() => {
    if (isSubmitting) {
      setIsEditDisabled(true);
    }
  }, [isSubmitting, setIsEditDisabled]);

  if (isEditDisabled) {
    return (
      <Wrapper>
        <button
          type="button"
          className="invisible-btn"
          onClick={() => {
            setIsEditDisabled(false);
          }}
          key={nanoid()}
          title="Edit publication"
        >
          <AiFillEdit />
        </button>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <button
          type="submit"
          className="invisible-btn"
          key={nanoid()}
          title="Save changes"
        >
          <AiFillSave />
        </button>

        <button
          type="button"
          className="invisible-btn"
          onClick={onClickDiscard}
          key={nanoid()}
          title="Discard changes"
        >
          <AiOutlineUndo />
        </button>
        <button
          type="button"
          className="invisible-btn"
          onClick={onClickDelete}
          key={nanoid()}
          title="Delete publication"
        >
          <AiFillDelete />
        </button>
      </Wrapper>
    );
  }
};
export default ButtonStrip;

const Wrapper = styled.div`
  /* width: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
  min-height: 2rem;

  button {
    font-size: 1.3rem;
  }
`;
