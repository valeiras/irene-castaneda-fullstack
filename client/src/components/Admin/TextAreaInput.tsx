const TextAreaInput: React.FC<{
  name: string;
  defaultValue: string;
  label: string;
  isEditDisabled: boolean;
}> = ({ name, defaultValue, label, isEditDisabled }) => {
  return (
    <div className="full-line-editor-form-row">
      <label htmlFor={name} className="editor-form-label">
        {label}:
      </label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={10}
        className="editor-form-textarea"
        disabled={isEditDisabled}
      />
    </div>
  );
};
export default TextAreaInput;
