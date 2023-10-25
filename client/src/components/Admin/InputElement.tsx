import styled from 'styled-components';

export const InputElement: React.FC<{
  name: string;
  defaultValue: string;
  label: string;
  isDisabled: boolean;
}> = ({ name, defaultValue, label, isDisabled }) => {
  return (
    <Wrapper className="InputElement">
      <label htmlFor={name} className="editor-form-label">
        {label}:
      </label>
      <input
        type="text"
        name={name}
        defaultValue={defaultValue}
        className="editor-form-input"
        disabled={isDisabled}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: var(--label-width) 6rem;
  align-items: center;
`;
