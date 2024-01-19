
export interface ChannelType {
  id: string;
  name: string;
  visibility: string;
}
export type DMUserType = {
  username: string;
  profileImgUrl: string;
  id: string;
};
export interface DMType {
  id: string;
  user1: DMUserType;
  user2: DMUserType;
  image: string;
}
