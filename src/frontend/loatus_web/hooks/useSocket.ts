import { io, Socket } from 'socket.io-client';
import { useCallback } from 'react';

const backUrl = process.env.REACT_APP_DB_HOST + '/api/';

const sockets: { [key: string]: Socket } = {};
const useSocket = (Channel?: string): [Socket | undefined, () => void] => {
  console.log('rerender', Channel);
  const disconnect = useCallback(() => {
    if (Channel) {
      sockets[Channel].disconnect();
      delete sockets[Channel];
    }
  }, [Channel]);
  if (!Channel) {
    return [undefined, disconnect];
  }
  if (!sockets[Channel]) {
    sockets[Channel] = io(`${backUrl}/ws-${Channel}`, {
      transports: ['websocket'],
    });
  }

  return [sockets[Channel], disconnect];
};

export default useSocket;
