import axios from 'axios';

const fetcher = ([url, token]: string[]) =>
  axios
    .get(url, {
      withCredentials: true,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((response) => response.data);

export default fetcher;
