import styled from 'styled-components';
import { DeletePublicationConfirmationModal } from '.';

import {
  AiFillEdit,
  AiFillSave,
  AiOutlineUndo,
  AiFillDelete,
} from 'react-icons/ai';
import { usePublicationEditorContext } from './PublicationEditor';
import { useState } from 'react';

const ButtonStrip: React.FC = () => {
  const {
    isDisabled,
    setIsDisabled,
    resetIdx,
    setResetIdx,
    setTempAuthorIds,
    publication,
  } = usePublicationEditorContext();
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);

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
          key="save"
          title="Save changes"
        >
          <AiFillSave />
        </button>

        <button
          type="button"
          className="invisible-btn"
          onClick={() => {
            setTempAuthorIds(publication.authorIds);
            setIsDisabled(true);
            setResetIdx(resetIdx + 1);
          }}
          title="Discard changes"
        >
          <AiOutlineUndo />
        </button>
        <button
          type="button"
          className="invisible-btn"
          onClick={() => {
            setIsConfirmationModalVisible(true);
          }}
          title="Delete publication"
        >
          <AiFillDelete />
        </button>
        <DeletePublicationConfirmationModal
          isConfirmationModalVisible={isConfirmationModalVisible}
          setIsConfirmationModalVisible={setIsConfirmationModalVisible}
        />
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
  gap: 1rem;

  button {
    font-size: 1.3rem;
  }
`;
