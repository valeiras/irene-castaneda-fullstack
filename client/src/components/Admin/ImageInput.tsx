import { AiOutlineUpload } from 'react-icons/ai';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const ImageInput: React.FC<{ url: string; isEditDisabled: boolean }> = ({
  url,
  isEditDisabled,
}) => {
  const [hasPictureFile, setHasPictureFile] = useState(url !== '');

  useEffect(() => {
    const fileUpload = document.getElementById(
      'file-upload'
    ) as HTMLInputElement;
    if (fileUpload) fileUpload.value = '';
  }, []);

  const handleImageInput = () => {
    const fileInput = document.getElementById(
      'file-upload'
    ) as HTMLInputElement;
    setHasPictureFile(true);
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const img = document.getElementById('image-preview');
        if (typeof evt.target?.result === 'string') {
          img?.setAttribute('src', evt.target.result);
        }
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  };

  const labelClass = `btn upload-btn ${hasPictureFile ? 'margin-top' : ''} ${
    isEditDisabled ? 'disabled' : ''
  }`;

  return (
    <Wrapper>
      <span className="label">Image: </span>
      <div className="img-container">
        <img src={url} alt="" id="image-preview" />

        <label htmlFor="file-upload" className={labelClass}>
          <span className="upload-icon">
            <AiOutlineUpload />
          </span>
          {hasPictureFile ? 'Update' : 'Upload'}
        </label>
        <input
          id="file-upload"
          name="imageFile"
          type="file"
          accept="image/*"
          onChange={handleImageInput}
          required={!hasPictureFile}
          disabled={isEditDisabled}
        />
      </div>
    </Wrapper>
  );
};
export default ImageInput;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  .label {
    width: var(--label-width);
  }

  input[type='file'] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  .custom-img-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
  }

  .upload-btn {
    display: flex;
    gap: 0.2rem;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-width: 0;
  }

  .upload-btn.disabled {
    cursor: default;
    background: var(--grey-200);
    color: var(--grey-500);
  }

  .upload-icon {
    font-size: 1.2rem;
    display: flex;
  }

  .img-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 150px;
  }

  #image-preview.hidden-image {
    display: none;
  }
  .margin-top {
    margin-top: 0.5rem;
  }

  #image-preview {
    width: 100%;
  }
`;
