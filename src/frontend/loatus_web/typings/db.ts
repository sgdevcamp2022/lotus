export type ILogin = {
  code: number;
  message: string;
  object: IToken | null;
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
  password: string;
  profile_image: string;
  provider: string;
  userid: number;
};

export type lostarkInfo = {
  code: number;
  message: string;
  object: object[];
};

export type IPost = {
  id: number;
  title: string;
  author: IUser;
  content: string;
  published_date: Date;
  like: IUser[];
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
