export type APIItem<T> = {
  code: number;
  message: string;
  data: T;
};

export type IToken = {
  accessToken: string;
  grantType: string;
  refreshToken: null | string;
  username: string;
};

export type IUser = {
  activated: boolean;
  auth: string;
  email: string;
  nickname: string;
  profile_image: string;
  provider: string;
  userid: number;
  stoveNo: string | null;
};

export type lostarkInfo = {
  ServerName: string;
  CharacterName: string;
  CharacterLevel: number;
  CharacterClassName: string;
  ItemAvgLevel: string;
  ItemMaxLevel: string;
};

export type IPost = {
  pk: number;
  fields: {
    title: string;
    author: string;
    content: string;
    published_date: Date;
    like: string[];
  };
};

export type IComment = {
  post: IPost;
  comment_author: IUser;
  text: string;
  created_at: Date;
};

export type DjangoUser = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  groups: [];
  user_permissions: [];
  is_staff: boolean;
  is_active: boolean;
  is_superuser: boolean;
  last_login: Date;
  data_joined: Date;
};
