import axios from 'axios';

const fetcher = async ([url, token]: string[]) => {
  const res = await axios
    .get(url, {
      withCredentials: true,
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    })
    .then((response) => response.data.data)
    .catch((error) => null);
  if (res === null) {
    const error = new Error('errro');
    throw error;
  }

  return res;
};

export default fetcher;
