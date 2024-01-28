import Skeleton from "react-loading-skeleton";
import { MatchResaultType } from "domain/model/home.type";
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
import { withPad } from "helpers/index";
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
  isWin,
}: MatchResaultType) => {
  return (
    <MatchTableRow $success={isWin} key={id}>
      <MatchTableCell>
        <ResaultContainer>
          <UserRofile>
            <img src={userImage} alt="" />
          </UserRofile>
          <Resault>
            <span>{withPad(userScore)}</span>
            <span>:</span>
            <span>{withPad(opponentScore)}</span>
          </Resault>
          <UserRofile>
            <img src={opponentIamge} alt="" />
          </UserRofile>
        </ResaultContainer>
        <ScoreConatiner>
          <Score>
            Level : <ScoreLevel>{withPad(level)}</ScoreLevel>{" "}
            <ScoreSeperator></ScoreSeperator>, points :{" "}
            <ScorePoints $success={isWin}>{withPad(points)}</ScorePoints>
          </Score>
          <ScoreDate>{matchDate.toDateString()}</ScoreDate>
        </ScoreConatiner>
      </MatchTableCell>
      <MatchTableDateCell>{matchDate.toDateString()}</MatchTableDateCell>
      <MatchTablePointsCell $success={isWin}>
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
