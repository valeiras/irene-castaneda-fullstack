import styled from 'styled-components';
import { DeletePublicationConfirmationModal } from '.';

import {
  AiFillEdit,
  AiFillSave,
  AiOutlineUndo,
  AiFillDelete,
} from 'react-icons/ai';
import { usePublicationEditorContext } from './PublicationEditor';
import { useEffect, useState } from 'react';
import { useNavigation } from 'react-router-dom';
import { nanoid } from 'nanoid';

const ButtonStrip: React.FC = () => {
  const {
    isEditDisabled,
    setIsEditDisabled,
    resetIdx,
    setResetIdx,
    setTempAuthorIds,
    publication,
  } = usePublicationEditorContext();

  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);

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
          onClick={() => {
            setTempAuthorIds(publication.authorIds);
            setIsEditDisabled(true);
            setResetIdx(resetIdx + 1);
          }}
          key={nanoid()}
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
          key={nanoid()}
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
