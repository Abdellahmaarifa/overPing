import FriendshipMatchesComponent from "./FrientshipMatches";
import Suggestions from "./Suggestion";
import FriendshipMatches from "./MatchHistories";
import tw from "twin.macro";

const OverViewContainer = tw.div`
w-full h-fit min-h-[300px] flex justify-start items-center flex-col gap-[10px] min-w-[fit-content]
`;
const HomeOverview = () => {
  return (
    <OverViewContainer>
      <div tw="hidden w-full h-[24px] xs:flex lg:hidden justify-between items-center rounded-[4px] bg-[#1F272E] overflow-hidden">
        <div tw="w-1/2 flex justify-center items-center bg-[#4C4C57] h-full">
          <h3 tw="text-[12px] text-white font-rubik font-normal">
            Match History
          </h3>
        </div>
        <div tw="w-1/2 flex justify-center items-center h-full">
          <h3 tw="text-[12px] text-[#4C5258] font-rubik font-normal">
            Friendship matches
          </h3>
        </div>
      </div>
      <FriendshipMatches />
      <div tw="2xl:fixed 2xl:top-[120px] 2xl:right-[50px] w-full h-auto  2xl:w-[350px] flex flex-col items-center gap-[10px] 2xl:gap-[16px]">
        <FriendshipMatchesComponent />
        <Suggestions />
      </div>
    </OverViewContainer>
  );
};

export default HomeOverview;
