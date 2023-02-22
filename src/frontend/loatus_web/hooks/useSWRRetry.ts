import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { StateMutator } from 'swr-global-state';
import postFetcher from '@utils/postFetcher';

const useSWRRetry = <T = any>(url: string | null, refreshToken: string, isPost: boolean = false) =>
  useSWR<T | null>(
    url && localStorage.getItem('accessToken') ? [url, localStorage.getItem('accessToken')] : null,
    isPost ? postFetcher : fetcher,
    {
      onErrorRetry: (err, key, config, revalidate, { retryCount }) => {
        if (retryCount < 3) {
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
        }
      },
    },
  );

export default useSWRRetry;
