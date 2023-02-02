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
