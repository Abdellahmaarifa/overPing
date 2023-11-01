import React from "react";
import tw from "twin.macro";

const FriendshipMatches = tw.div`
  w-full h-[300px] bg-[#0E1821] rounded-[16px] flex justify-start items-center gap-[16px] flex-col min-w-[300px] p-[16px]
`;

const MatchText = tw.h4`
  font-inter text-[#808193]
`;

const Salma = tw.span`text-[#3CBD8F]`;
const Against = tw.span``;
const Dragon = tw.span`text-[#E5818E]`;

const SeeMore = tw.a`
  font-inter text-[12px] text-white  [font-weight: 500]
`;

const FriendshipMatchesComponent = () => {
  return (
    <FriendshipMatches>
      <h1 tw="font-rubik text-[21px] font-bold text-white">
        Friendship Matches
      </h1>
      <div tw="flex items-center justify-center gap-[16px] flex-col text-[16px] sm:text-[18px] 2xl:text-[16px]">
        <MatchText>
          <Salma>Salma</Salma> Wins: 11 - 03 Against <Dragon>dragon</Dragon>
        </MatchText>
        <MatchText>
          <Salma>Salma</Salma> Wins: 11 - 03 Against <Dragon>dragon</Dragon>
        </MatchText>
        <MatchText>
          <Salma>Salma</Salma> Wins: 11 - 03 Against <Dragon>dragon</Dragon>
        </MatchText>
      </div>
      <SeeMore href="#">See more</SeeMore>
    </FriendshipMatches>
  );
};

export default FriendshipMatchesComponent;
