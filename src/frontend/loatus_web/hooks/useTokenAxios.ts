import axios from 'axios';
import { StateMutator } from 'swr-global-state';

const useTokenAxios = (
  accessToken: string | null,
  setAccessToken: StateMutator<string | null>,
  refreshToken: string,
) => {
  console.log('token axios 실행');
  const tokenAxios = axios.create();
  tokenAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      axios
        .post(
          '/auth/reissue/',
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${accessToken}`,
              refreshToken: refreshToken,
            },
          },
        )
        .then((res) => {
          //TODO: 디버그 콘솔 출력 제거
          console.log('엑세스 토큰 재발급');
          setAccessToken(res.data.data);
        })
        .catch((error) => error);
    },
  );
};

export default useTokenAxios;
