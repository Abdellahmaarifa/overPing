
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

interface ChannelSampleMember {
    id : string;
      username: string;
      email : string;
      profileImgUrl : string;
}

export interface ChannelSample {
  id: string;
  owner_id: number;
  name: string;
  description?: string;
  visibility: "public" | "protected" | "private";
  admins :  ChannelSampleMember[] | [];
  members : ChannelSampleMember[] | [];
}