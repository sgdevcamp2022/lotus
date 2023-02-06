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
