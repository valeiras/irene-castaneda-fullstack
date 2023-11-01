import { IPublication } from '../../utils/types';
import { InputElement } from './';
import { usePublicationEditorContext } from './editors/PublicationEditor';

const JournalInfoFormRow: React.FC<{
  publication: IPublication;
}> = ({ publication }) => {
  const { isEditDisabled } = usePublicationEditorContext();

  return (
    <div className="flex-editor-form-row">
      <InputElement
        name="year"
        defaultValue={publication.year}
        isEditDisabled={isEditDisabled}
        label="year"
        isRequired={true}
      />
      <InputElement
        name="pages"
        defaultValue={publication.pages || ''}
        isEditDisabled={isEditDisabled}
        label="pages"
      />
      <InputElement
        name="link"
        defaultValue={publication.link}
        isEditDisabled={isEditDisabled}
        label="link"
      />
    </div>
  );
};
export default JournalInfoFormRow;
