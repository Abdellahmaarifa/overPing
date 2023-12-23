export type User = {
  token: string | null;
  id?: string;
  email?: string;
  userName?: string;
  profilePhoto?: string;
  twoStepVerificationEnabled?:boolean
  __typename?: "UserResponse" | undefined;
};
