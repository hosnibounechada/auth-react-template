export type User = {
  id: string;
  username: string;
  fullName: {
    firstName: string;
    lastName: String;
  };
  email: string;
  picture: string;
  thumbnail: string;
  accessToken: string;
};
