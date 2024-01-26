
export interface IGameData {
    playerOneId:       number
    playerOneName:     string
    playerOneImageURL: string
    playerOneScore:    number
    playerOneStatus:   number
    playerTwoId:       number
    playerTwoName:     string
    playerTwoImageURL: string
    playerTwoScore:    number
    playerTwoStatus:   number
    points:            number
    level:             number
}

export interface IGameResult {
    id:        number;
    player1:   IUserInfo;
    player2:   IUserInfo;
    points:    number;
    level:     number;
    createdAt: any;
}

export interface IUserInfo {
    id:            number;
    username:      string;
    profileImgUrl: string;
    score:         number;
    status:        boolean;
}