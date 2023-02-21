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
