import { IUser } from '@typings/db';

export type Channel = {
  id: number;
  name: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  ownerId: number;
};

export type Party = {
  id: number;
  name: string;
  private: boolean;
  createdAt: Date;
  updatedAt: Date;
  channelId: number;
  ownerId: number;
  Owner: {
    id: number;
    characterName: string | null;
    email: string;
    nickname: string;
    profileImage: string | null;
  };
};

export interface IChat {
  // 채널의 채팅
  id: number;
  UserId: number;
  User: IUser; // 보낸 사람
  content: string;
  createdAt: Date;
  PartyId: number;
  Party: IParty;
}

export interface IParty {
  id: number;
  name: string;
  private: boolean;
  ChannelId: number;
}
