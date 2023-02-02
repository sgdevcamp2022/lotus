import axios from 'axios';

const fetcher = ([url, token]: string[]) =>
  axios
    .get(url, {
      withCredentials: true,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((response) => response.data)
    .catch((error) => null);

export default fetcher;
