import ErrorModel from "components/common/ErrorModel/ErrorModel";
import { LeaderBoardContainer } from "./LeaderBoard.style";
import WaitingImg from "assets/common/waiting.png";

const LeaderBoard = () => {
  return (
    <LeaderBoardContainer>
      <ErrorModel
        code={501}
        name="Not Implemnted"
        description="comming soon, if the code is your thing, feel free to conterbute to this project"
        image={WaitingImg}
      />
    </LeaderBoardContainer>
  );
};

export default LeaderBoard;
