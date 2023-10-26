import styled from 'styled-components';

const InputElement: React.FC<{
  name: string;
  label: string;
  defaultValue?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  type?: string;
}> = ({
  name,
  label,
  defaultValue = '',
  isRequired = false,
  isDisabled = false,
  type = 'text',
}) => {
  return (
    <Wrapper className="InputElement">
      <label htmlFor={name} className="editor-form-label">
        {label}:
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="editor-form-input"
        disabled={isDisabled}
        required={isRequired}
      />
    </Wrapper>
  );
};

export default InputElement;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: var(--label-width) 8rem;
  align-items: center;
`;
