export type User = {
  token: string | null;
  id?: string;
  email?: string;
  username?: string;
  profilePhoto?: string;
  twoStepVerificationEnabled?: boolean;
  __typename?: "UserResponse" | undefined;
};
