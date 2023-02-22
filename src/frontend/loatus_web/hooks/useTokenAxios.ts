import axios from 'axios';
import { StateMutator } from 'swr-global-state';

const useTokenAxios = (refreshToken: string) => {
  const tokenAxios = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  tokenAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      axios
        .post(
          process.env.REACT_APP_DB_HOST + '/auth/reissue',
          {},
          {
            withCredentials: false,
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
