import tw from "twin.macro";

export const FriendsMatchesConatiner = tw.div`
  w-full h-[300px] bg-[#0E1821] rounded-[16px] flex justify-start items-center gap-[16px] flex-col min-w-[300px] p-[16px]
`;

export const MatchText = tw.h4`
  font-inter text-[#808193]
`;

export const Winner = tw.span`text-[#3CBD8F]`;
export const Against = tw.span``;
export const Loser = tw.span`text-[#E5818E]`;

export const SeeMore = tw.a`
  font-inter text-[12px] text-white  [font-weight: 500]
`;

export const FriendsMatchesTitle = tw.h1`
font-rubik text-[21px] font-bold text-white

`;

export const Resault = tw.div`
flex items-center justify-center gap-[16px] flex-col text-[16px] sm:text-[18px] 2xl:text-[16px]
`;
