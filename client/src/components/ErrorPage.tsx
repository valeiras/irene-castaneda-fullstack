import styled from 'styled-components';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.error?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Unknown error';
  }

  return (
    <Wrapper className="ErrorPage">
      <h1 className="title-error">Oops</h1>
      <h2 className="subtitle-error">There has been an unexpected error...</h2>
      <h4 className="status-error">{errorMessage}</h4>
    </Wrapper>
  );
};

export default ErrorPage;
const Wrapper = styled.div`
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;

  h1,
  h2,
  h4 {
    width: 80%;
    text-align: center;
  }

  h1 {
    font-size: 3rem;
  }
  h2 {
    font-size: 1.5rem;
  }
  h4 {
    font-size: 1.3rem;
  }

  @media screen and (min-width: 992px) {
    h1,
    h2,
    h4 {
      width: 60%;
      text-align: center;
    }
  }
`;
