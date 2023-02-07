import axios from 'axios';

const fetcher = ([url, token]: string[]) =>
  axios
    .get(url, {
      withCredentials: true,
      headers: token
        ? {
            Authorization: 'Bearer ' + token,
          }
        : {},
    })
    .then((response) => response.data.data)
    .catch((error) => null);

export default fetcher;
