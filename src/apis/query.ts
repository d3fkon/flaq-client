import {AxiosError} from 'axios';
import {showMessage} from 'react-native-flash-message';
import axios from './axios';

export const auth = async (
  email: string,
  password: string,
  type: 'login' | 'signup',
) => {
  try {
    const response = await axios.post('/auth/' + type, {
      email,
      password,
      deviceToken: 'no-token',
    });
    return response.data;
  } catch (e: any) {
    showMessage({
      message: e.message,
      type: 'danger',
    });
  }
};

export const sendOtp = async (email: string) => {
  // try {
  const response = await axios.post('/auth/email-otp/sendOtp', {
    email,
  });
  return response.data;
  // } catch (e) {}
};

export const verifyOtp = async (email: string, otp: string) => {
  const response = await axios.post('/auth/email-otp/verifyOtp', {
    email,
    otp,
  });
  response.data;
};

export const logout = async () => {
  const response = await axios.get('/auth/logout');
  return response.data;
};
