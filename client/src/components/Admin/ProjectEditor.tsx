import { useState } from 'react';
import { IProject } from '../../utils/types';
import { Form } from 'react-router-dom';
import {
  ButtonStrip,
  DeleteItemConfirmationModal,
  FullLineInput,
  ImageInput,
  TextAreaInput,
} from '.';
import { useProjectsContext } from '../../routes/AdminProjects';

const ProjectEditor: React.FC<{
  project: IProject;
  isNew: boolean;
}> = ({ project, isNew }) => {
  const [
    isDeleteConfirmationModalVisible,
    setIsDeleteConfirmationModalVisible,
  ] = useState(false);
  const [isEditDisabled, setIsEditDisabled] = useState<boolean>(!isNew);
  const [resetIdx, setResetIdx] = useState(0);
  const { newProjects, setNewProjects } = useProjectsContext();

  const onClickDelete = () => {
    setIsDeleteConfirmationModalVisible(true);
  };

  const onClickDiscard = () => {
    setIsEditDisabled(true);
    setResetIdx(resetIdx + 1);
  };

  return (
    <>
      <Form
        className="editor-form"
        key={resetIdx}
        method={isNew ? 'post' : 'patch'}
        encType="multipart/form-data"
      >
        <FullLineInput
          name="title"
          defaultValue={project.title}
          label="title"
          isEditDisabled={isEditDisabled}
        />
        <TextAreaInput
          name="description"
          defaultValue={project.description}
          label="desc."
          isEditDisabled={isEditDisabled}
        />
        <ImageInput
          url={project.cloudinaryUrl}
          isEditDisabled={isEditDisabled}
        />
        <input type="hidden" name="itemId" value={project._id} />
        <ButtonStrip
          isEditDisabled={isEditDisabled}
          setIsEditDisabled={setIsEditDisabled}
          onClickDelete={onClickDelete}
          onClickDiscard={onClickDiscard}
        />
        <DeleteItemConfirmationModal
          isConfirmationModalVisible={isDeleteConfirmationModalVisible}
          setIsConfirmationModalVisible={setIsDeleteConfirmationModalVisible}
          id={project._id || ''}
          isNew={project.isNew || false}
          endpoint="projects"
          queryKey={['projects']}
          newItems={newProjects}
          setNewItems={setNewProjects}
        />
      </Form>
    </>
  );
};
export default ProjectEditor;
