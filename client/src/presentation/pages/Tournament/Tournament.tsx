import ErrorModel from "components/common/ErrorModel/ErrorModel";
import { TournamentContainer } from "./Tournament.style";
import WaitingImg from "assets/common/waiting.png";

const Tournament = () => {
  return (
    <TournamentContainer>
      <ErrorModel
        code={501}
        name="Not Implemnted"
        description="comming soon, if the code is your thing, feel free to conterbute to this project"
        image={WaitingImg}
      />
    </TournamentContainer>
  );
};

export default Tournament;
