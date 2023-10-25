import { IPublication } from '../../utils/Interfaces';
import { InputElement } from './InputElement';
import { usePublicationEditorContext } from './PublicationEditor';

const JournalInfoFormRow: React.FC<{
  publication: IPublication;
}> = ({ publication }) => {
  const { isDisabled } = usePublicationEditorContext();

  return (
    <div className="flex-editor-form-row">
      <InputElement
        name="year"
        defaultValue={publication.year}
        isDisabled={isDisabled}
        label="year"
      />
      <InputElement
        name="pages"
        defaultValue={publication.pages || ''}
        isDisabled={isDisabled}
        label="pages"
      />
      <InputElement
        name="year"
        defaultValue={publication.year}
        isDisabled={isDisabled}
        label="year"
      />
    </div>
  );
};
export default JournalInfoFormRow;
