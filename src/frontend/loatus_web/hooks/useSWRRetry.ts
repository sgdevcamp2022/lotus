import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { StateMutator } from 'swr-global-state';

const useSWRRetry = <T = any>(url: string, refreshToken: string) =>
  useSWR<T | null>(localStorage.getItem('accessToken') ? [url, localStorage.getItem('accessToken')] : null, fetcher, {
    onErrorRetry: (err, key, config, revalidate, { retryCount }) => {
      if (retryCount < 3) {
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
      }
    },
  });

export default useSWRRetry;
