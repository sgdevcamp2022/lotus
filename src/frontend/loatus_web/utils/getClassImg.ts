const url = (className: string) =>
  `https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/emblem_${className}.png`;
const thumbUrl = (className: string) =>
  `https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/${className}_s.png`;

const classTable = [
  { korName: '디스트로이어', engName: 'destroyer' },
  { korName: '워로드', engName: 'warlord' },
  { korName: '버서커', engName: 'berserker' },
  { korName: '홀리나이트', engName: 'holyknight' },
  { korName: '배틀마스터', engName: 'battle_master' },
  { korName: '인파이터', engName: 'infighter' },
  { korName: '기공사', engName: 'force_master' },
  { korName: '창술사', engName: 'lance_master' },
  { korName: '스트라이커', engName: 'striker' },
  { korName: '데빌헌터', engName: 'devilhunter' },
  { korName: '블래스터', engName: 'blaster' },
  { korName: '호크아이', engName: 'hawkeye' },
  { korName: '스카우터', engName: 'scouter' },
  { korName: '건슬링어', engName: 'gunslinger' },
  { korName: '바드', engName: 'bard' },
  { korName: '서머너', engName: 'summoner' },
  { korName: '아르카나', engName: 'arcana' },
  { korName: '소서리스', engName: 'sorceress' },
  { korName: '데모닉', engName: 'demonic' },
  { korName: '블레이드', engName: 'blade' },
  { korName: '리퍼', engName: 'reaper' },
  { korName: '도화가', engName: 'artist' },
  { korName: '기상술사', engName: 'weather_artist' },
];

export const getClassImg = (className: string): string | null => {
  for (let lostArkClass of classTable) {
    if (lostArkClass.korName === className) {
      return url(lostArkClass.engName);
    }
  }
  return null;
};

export const getClassThumbImg = (className: string): string | null => {
  for (let lostArkClass of classTable) {
    if (lostArkClass.korName === className) {
      return thumbUrl(lostArkClass.engName);
    }
  }
  return null;
};
