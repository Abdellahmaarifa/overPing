import Skeleton from "react-loading-skeleton";
import { MatchResaultType } from "types/home.type";
import {
  MatchTableCell,
  MatchTableDateCell,
  MatchTableLevelCell,
  MatchTablePointsCell,
  MatchTableRow,
  Resault,
  ResaultContainer,
  Score,
  ScoreConatiner,
  ScoreDate,
  ScoreLevel,
  ScorePoints,
  ScoreSeperator,
  UserRofile,
} from "./MatchResault.style";
import { withPad } from "helpers";
import tw from "twin.macro";
const temp = tw.a``;
const MatchResault = ({
  id,
  userImage,
  opponentIamge,
  opponentScore,
  userScore,
  matchDate,
  points,
  level,
}: MatchResaultType) => {
  const isWinner = userScore >= opponentScore;
  return (
    <MatchTableRow $success={isWinner} key={id}>
      <MatchTableCell>
        <ResaultContainer>
          <UserRofile>
            <img src={isWinner ? userImage : opponentIamge} alt="" />
          </UserRofile>
          <Resault>
            <span>{withPad(isWinner ? userScore : opponentScore)}</span>
            <span>:</span>
            <span>{withPad(isWinner ? opponentScore : userScore)}</span>
          </Resault>
          <UserRofile>
            <img src={isWinner ? opponentIamge : userImage} alt="" />
          </UserRofile>
        </ResaultContainer>
        <ScoreConatiner>
          <Score>
            Level : <ScoreLevel>{withPad(level)}</ScoreLevel>{" "}
            <ScoreSeperator></ScoreSeperator>, points :{" "}
            <ScorePoints $success={isWinner}>{withPad(points)}</ScorePoints>
          </Score>
          <ScoreDate>{matchDate.toDateString()}</ScoreDate>
        </ScoreConatiner>
      </MatchTableCell>
      <MatchTableDateCell>{matchDate.toDateString()}</MatchTableDateCell>
      <MatchTablePointsCell $success={isWinner}>
        {withPad(points)}
      </MatchTablePointsCell>
      <MatchTableLevelCell>{withPad(level)}</MatchTableLevelCell>
    </MatchTableRow>
  );
};

export const MatchResaultSkeleton = (props: any) => {
  return (
    <tr
      tw="
    flex justify-evenly items-center h-[140px] sm:h-[80px] rounded-[12px] p-[16px]
    relative
  "
    >
      <td>
        <Skeleton
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            left: "0",
            top: "0",
          }}
        />
      </td>
    </tr>
  );
};
export default MatchResault;
