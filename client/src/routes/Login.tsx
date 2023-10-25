/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';

import { Form, redirect, useNavigation } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { LoginFormRow } from '../components';
import { AxiosError } from 'axios';

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/login', data);
    return redirect('/admin');
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.msg);
    } else {
      toast.error('Something went wrong...');
    }
    return error;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4>Login</h4>
        <LoginFormRow name="email" type="email" />
        <LoginFormRow name="password" type="password" />

        <button
          type="submit"
          className="btn btn-block"
          disabled={isSubmmitting}
        >
          {isSubmmitting ? 'submitting...' : 'submit'}
        </button>
      </Form>
    </Wrapper>
  );
};
export default Login;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;

  h4 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  button {
    margin-top: 1rem;
  }
`;
