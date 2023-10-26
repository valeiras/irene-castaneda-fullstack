import { usePublicationEditorContext } from './PublicationEditor';

const FullLineFormRow: React.FC<{
  name: string;
  defaultValue: string;
  label: string;
}> = ({ name, defaultValue, label }) => {
  const { isEditDisabled } = usePublicationEditorContext();
  return (
    <div className="full-line-editor-form-row">
      <label htmlFor={name} className="editor-form-label">
        {label}:
      </label>
      <input
        type="text"
        name={name}
        defaultValue={defaultValue}
        className="editor-form-input"
        disabled={isEditDisabled}
      />
    </div>
  );
};
export default FullLineFormRow;
