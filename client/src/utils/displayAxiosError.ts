import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

const displayAxiosError = (error: unknown) => {
  if (error instanceof AxiosError) {
    toast.error(error?.response?.data?.msg);
  } else {
    toast.error('Something went wrong');
  }
  console.log(error);
};

export default displayAxiosError;
