export const UPDATE_STATUS = `
mutation updateUserStatus($currentTime: String!) {
  updateUserStatus(currentTime:$currentTime)
}
`;

export const GET_USER_QUERY = `
  query getUser {
    getUser {
      id
      username
      email
      twoStepVerificationEnabled
      profileImgUrl   
      showUpdateWin
    }
  }
`;

export const PROFILE_QUERY = `
  query Account($userId: Float!) {
    findUserById(id: $userId) {
      id
      email
      username
      profileImgUrl
    }

    findProfileByUserId(userId: $userId) {
      id
      nickname
      title
      xp
      rank
      displayRank
      about
      bgImageUrl
      wallet {
        id
        balance
        betAmount
      }
      gameStatus {
        matchesLoss
        matchesWon
        totalMatches
        win_streak
        best_win_streak
      }
    }
  }
`;
