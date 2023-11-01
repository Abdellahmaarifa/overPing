import MatchResault from "../MatchResault/MatchResault";
import {
  MatchHistoryContainer,
  MatchTable,
  MatchTableBody,
  MatchTableHeader,
  MatchTableHeaderCell,
  MatchHistoriesTitle,
} from "./MatchHistories.style";
const MatchHistories = () => {
  return (
    <>
      <MatchHistoriesTitle>Match Histories</MatchHistoriesTitle>
      <MatchHistoryContainer>
        <MatchTable>
          <MatchTableHeader>
            <MatchTableHeaderCell>Match</MatchTableHeaderCell>
            <MatchTableHeaderCell>Date</MatchTableHeaderCell>
            <MatchTableHeaderCell>Points</MatchTableHeaderCell>
            <MatchTableHeaderCell tw="">Level</MatchTableHeaderCell>
          </MatchTableHeader>
          <MatchTableBody>
            <MatchResault
              userImage=""
              opponentIamge=""
              userScore={100}
              opponentScore={200}
              matchDate="12 Monday 2023"
              points={200}
              level={1000}
            />
          </MatchTableBody>
        </MatchTable>
      </MatchHistoryContainer>
    </>
  );
};

export default MatchHistories;
