import tw from "twin.macro";
import FriendsMatches from "../FriendsMatches/FrientsMatches";
import MatchHistories from "../MatchHistories/MatchHistories";
import Suggestions from "../Suggestions/Suggestion";
import { useLayoutContext } from "context/layout.context";
import { useEffect } from "react";
const OverViewContainer = tw.div`
w-full h-fit min-h-[300px] flex justify-start items-center flex-col gap-[10px] min-w-[fit-content]
`;
const HomeOverview = () => {
  const {
    matchTabState: [matchTabState, setMatchTabState],
    friendsMatchTabState: [friendMatchTab, setFriendMatchTab],
  } = useLayoutContext();

  useEffect(() => {
    console.log(window.innerWidth);
    if (window.innerWidth > 400 && window.innerWidth < 1024)
      setFriendMatchTab(false);
  }, []);
  return (
    <OverViewContainer>
      <div tw="hidden w-full h-[24px] xs:flex lg:hidden justify-between items-center rounded-[4px] bg-[#1F272E] overflow-hidden">
        <div
          tw="w-1/2 flex justify-center items-center  h-full cursor-pointer"
          style={{ background: matchTabState ? "#4C4C57" : "transparent" }}
          onClick={() => {
            setMatchTabState(true);
            setFriendMatchTab(false);
          }}
        >
          <h3
            tw="text-[12px]  font-rubik font-normal"
            style={{ color: matchTabState ? "white" : "#4C5258" }}
          >
            Match History
          </h3>
        </div>
        <div
          tw=" w-1/2 flex justify-center items-center h-full cursor-pointer"
          style={{
            background: !matchTabState ? "#4C4C57" : "transparent",
          }}
          onClick={() => {
            setMatchTabState(false);
            setFriendMatchTab(true);
          }}
        >
          <h3
            tw="text-[12px]  font-rubik font-normal"
            style={{ color: !matchTabState ? "white" : "#4C5258" }}
          >
            Friendship matches
          </h3>
        </div>
      </div>
      <MatchHistories active={matchTabState} />
      <div tw="2xl:fixed 2xl:top-[120px] 2xl:right-[50px] w-full h-auto  2xl:w-[380px] flex flex-col items-center gap-[10px] 2xl:gap-[16px] ">
        <FriendsMatches active={friendMatchTab} />
        <Suggestions />
      </div>
    </OverViewContainer>
  );
};

export default HomeOverview;
