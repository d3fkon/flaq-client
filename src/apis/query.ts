import axios from './axios';

export const auth = async (
  email: string,
  password: string,
  type: 'login' | 'signup',
) => {
  const response = await axios.post('/auth/' + type, {
    email,
    password,
    deviceToken: 'no-token',
  });
  return response.data;
};

export const sendOtp = async (email: string) => {
  const response = await axios.post('/auth/email-otp/sendOtp', {
    email,
  });
  return response.data;
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
