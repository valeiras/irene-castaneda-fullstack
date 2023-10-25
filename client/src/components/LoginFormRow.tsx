const LoginFormRow = ({
  type,
  name,
  labelText,
}: {
  type: React.HTMLInputTypeAttribute;
  name: string;
  labelText?: string;
}): JSX.Element => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        defaultValue={''}
        required
      />
    </div>
  );
};
export default LoginFormRow;
