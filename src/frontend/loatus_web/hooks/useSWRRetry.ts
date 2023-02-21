import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { StateMutator } from 'swr-global-state';

const useSWRRetry = (
  url: string,
  accessToken: string | null,
  setAccessToken: StateMutator<string | null>,
  refreshToken: string,
) =>
  useSWR<IUser | null>(accessToken ? [url, accessToken] : null, fetcher, {
    onErrorRetry: (err, key, config, revalidate, { retryCount }) => {
      if (retryCount < 3) {
        axios
          .post(
            '/auth/reissue',
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
            setAccessToken(res.data.data);
          })
          .catch((error) => error);
      }
    },
  });

export default useSWRRetry;
