const FullLineInput: React.FC<{
  name: string;
  defaultValue: string;
  label: string;
  isEditDisabled: boolean;
  isRequired?: boolean;
}> = ({ name, defaultValue, label, isEditDisabled, isRequired = false }) => {
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
        required={isRequired}
      />
    </div>
  );
};
export default FullLineInput;
