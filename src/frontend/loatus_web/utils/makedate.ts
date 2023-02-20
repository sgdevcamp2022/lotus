import dayjs from 'dayjs';

const makedate = (time: Date): string => {
  if (dayjs().diff(dayjs(time), 'day') < 1) {
    return `${dayjs(time).get('hour')} 시간 전`;
  } else if (dayjs().diff(time, 'day') < 7) {
    return dayjs().diff(time, 'day') + '일 전';
  }
  return dayjs(time).format('YY-MM-DD');
};

export default makedate;
