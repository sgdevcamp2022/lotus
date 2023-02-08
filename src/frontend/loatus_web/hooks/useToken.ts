import { createStore } from 'swr-global-state';

const useToken = createStore<string | null>({
  key: '@utils/token',
  initial: '',
});

export default useToken;
