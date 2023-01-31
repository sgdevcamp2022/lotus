import axios from 'axios';
import { useCookies } from 'react-cookie';

const fetcher = (url: string) => {
  const [cookie] = useCookies(['accessToken']);
  return axios
    .get(url, {
      withCredentials: true,
      headers: {
        Authorization: 'Bearer ' + cookie,
      },
    })
    .then((response) => response.data);
};

export default fetcher;
