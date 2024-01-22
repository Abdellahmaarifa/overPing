import { useLayoutContext } from "context/layout.context";
import { useEffect } from "react";
import tw from "twin.macro";
import FriendsMatches from "../FriendsMatches/FrientsMatches";
import MatchHistories from "../MatchHistories/MatchHistories";
import Suggestions from "../Suggestions/Suggestion";
import {
  RightSideConatiner,
  Tab,
  TabContainer,
  TabHeading,
} from "./HomeOverview.style";
const OverViewContainer = tw.div`
  w-full h-fit min-h-[300px] flex justify-start items-center flex-col gap-[10px] min-w-[fit-content]
`;
const HomeOverview = () => {
  const {
    matchTabState: [matchTabState, setMatchTabState],
    friendsMatchTabState: [friendMatchTab, setFriendMatchTab],
  } = useLayoutContext();

  useEffect(() => {
    // this is the only thing i can think of for now, i might change this later!
    window.addEventListener("resize", () => {
      if (window.innerWidth > 400 && window.innerWidth < 1024)
        setFriendMatchTab(false);

      if (window.innerWidth > 1024 || window.innerWidth < 400) {
        setMatchTabState(true);
        setFriendMatchTab(true);
      }
    });
  }, []);
  return (
    <OverViewContainer>
      <TabContainer>
        <Tab
          style={{
            background: matchTabState ? "#4C4C57" : "transparent",
          }}
          onClick={() => {
            setMatchTabState(true);
            setFriendMatchTab(false);
          }}
        >
          <TabHeading style={{ color: matchTabState ? "white" : "#4C5258" }}>
            Match History
          </TabHeading>
        </Tab>
        <Tab
          style={{
            background: !matchTabState ? "#4C4C57" : "transparent",
          }}
          onClick={() => {
            setMatchTabState(false);
            setFriendMatchTab(true);
          }}
        >
          <TabHeading style={{ color: !matchTabState ? "white" : "#4C5258" }}>
            Friendship matches
          </TabHeading>
        </Tab>
      </TabContainer>
      <MatchHistories active={true} />
      <RightSideConatiner>
        <FriendsMatches active={true} />
        <Suggestions />
      </RightSideConatiner>
    </OverViewContainer>
  );
};

export default HomeOverview;
