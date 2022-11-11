export interface UserAPI {
  displayName: string;
  id: string;
  lastMessage: string;
  sender: string;
  status: boolean;
  thumbnail: string;
  updatedAt: Date;
  viewed: boolean;
}

export interface UsersObj {
  [id: string]: {
    id: string;
    sender: string;
    displayName: string;
    thumbnail: string;
    lastMessage: string;
    time: Date;
    viewed: boolean;
    status: boolean;
  };
}
