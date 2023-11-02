import tw from "twin.macro";

export const FriendsMatchesConatiner = tw.div`
  w-full h-fit bg-[#0E1821] rounded-[16px] flex justify-start items-center gap-[16px] flex-col min-w-[300px] p-[16px] max-h-[500px] overflow-scroll 
`;

export const MatchText = tw.div`
  font-inter text-[#808193]
  w-full grid
  [grid-template-columns: 1fr 2fr 1fr]
  text-center
`;

export const Winner = tw.span`text-[#3CBD8F] text-center`;
export const Against = tw.span``;
export const Loser = tw.span`text-[#E5818E] text-center`;

export const SeeMore = tw.a`
  font-inter text-[12px] text-white  [font-weight: 500]
`;

export const FriendsMatchesTitle = tw.h1`
font-rubik text-[21px] font-bold text-white

`;

export const Resault = tw.div`
flex items-center justify-center gap-[16px] flex-col text-[16px] sm:text-[18px] 2xl:text-[16px] 
`;
