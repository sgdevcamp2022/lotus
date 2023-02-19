import axios from 'axios';
import { StateMutator } from 'swr-global-state';

const useTokenAxios = (refreshToken: string) => {
  const tokenAxios = axios.create();
  tokenAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      axios
        .post(
          '/auth/reissue',
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              refreshToken: refreshToken,
            },
          },
        )
        .then((res) => {
          localStorage.setItem('accessToken', res.data.data);
        })
        .catch((error) => error);
    },
  );
  return tokenAxios;
};

export default useTokenAxios;
