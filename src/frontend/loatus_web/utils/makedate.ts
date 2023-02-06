import dayjs from 'dayjs';

const makedate = (time: Date): string => {
  const now = dayjs();
  if (now.diff(time, 'day') < 1) {
    return now.diff(time, 'hour') + '시간 전';
  }
  return dayjs(time).format('YY-MM-DD');
};

export default makedate;