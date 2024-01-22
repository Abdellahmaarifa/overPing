export type User = {
  token: string | null;
  id?: string;
  email?: string;
  username?: string;
  profileImgUrl?: string;
  twoStepVerificationEnabled?: boolean;
  __typename?: "UserResponse" | undefined;
  createdAt?: string;
  updatedAt?: string;
  showUpdateWin?: boolean;
};
