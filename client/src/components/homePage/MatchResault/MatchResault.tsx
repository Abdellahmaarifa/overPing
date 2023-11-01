import {
  MatchTableCell,
  MatchTableDateCell,
  MatchTableLevelCell,
  MatchTablePointsCell,
  Resault,
  ResaultContainer,
  Score,
  ScoreConatiner,
  ScoreDate,
  ScoreLevel,
  ScorePoints,
  ScoreSeperator,
  UserRofile,
  MatchTableRow,
} from "./MatchResault.style";
const MatchResault = ({
  userImage,
  opponentIamge,
  opponentScore,
  userScore,
  matchDate,
  points,
  level,
}: {
  userImage: string;
  opponentIamge: string;
  userScore: number;
  opponentScore: number;
  matchDate: string;
  points: number;
  level: number;
}) => {
  const isWinner = userScore >= opponentScore;
  return (
    <MatchTableRow $success={isWinner}>
      <MatchTableCell>
        <ResaultContainer>
          <UserRofile>
            <img src={isWinner ? userImage : opponentIamge} alt="" />
          </UserRofile>
          <Resault>
            <span>
              {isWinner ? userScore.toString() : opponentScore.toString()}
            </span>
            <span>:</span>
            <span>{isWinner ? opponentScore.toString() : userScore}</span>
          </Resault>
          <UserRofile>
            <img src={isWinner ? opponentIamge : userImage} alt="" />
          </UserRofile>
        </ResaultContainer>
        <ScoreConatiner>
          <Score>
            Level : <ScoreLevel>{level}</ScoreLevel>{" "}
            <ScoreSeperator></ScoreSeperator>
            points : <ScorePoints $success={isWinner}>{points}</ScorePoints>
          </Score>
          <ScoreDate>{matchDate}</ScoreDate>
        </ScoreConatiner>
      </MatchTableCell>
      <MatchTableDateCell>{matchDate}</MatchTableDateCell>
      <MatchTablePointsCell $success={isWinner}>{points}</MatchTablePointsCell>
      <MatchTableLevelCell>{level}</MatchTableLevelCell>
    </MatchTableRow>
  );
};

export default MatchResault;
