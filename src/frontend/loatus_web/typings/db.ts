export type APIItem<T> = {
  code: number;
  message: string;
  data: T;
};

export type Comment = {
  cur_user_id: number;
  cur_user_comment: string;
  cur_post_id: number;
};

export type IToken = {
  accessToken: string;
  grantType: string;
  refreshToken: null | string;
  username: string;
};

export type IUser = {
  userid: number;
  email: string;
  nickname: string;
  auth: string;
  stoveNo: string | null;
  characterName: string | null;
  profileImage: string | null;
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
    comments: Comment[];
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


export type Friend = {
  userId: number;
  nickname: string;
  profileImage: string | null;
  characterName: string | null;
  friendCount: number;
}