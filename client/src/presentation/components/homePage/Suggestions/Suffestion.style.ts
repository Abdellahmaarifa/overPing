import tw from "twin.macro";

export const SuggestionBox = tw.div`
  w-full h-fit min-h-[300px] bg-[#0E1821] flex flex-col items-center justify-start p-[16px] min-w-[300px] rounded-[16px] rounded-tl-[4px] rounded-tr-[4px]
`;

export const UserCard = tw.div`
  h-[64px] w-full flex items-center justify-between max-w-[320px]
`;

export const UserAvatar = tw.img`
  w-[48px] h-[48px] rounded-[16px] cursor-pointer`;

export const UserDetails = tw.div`
  flex flex-col justify-evenly items-start
`;

export const UserName = tw.p`
  text-[#B4B5CF] text-[14px] font-normal
`;

export const UserHandle = tw.span`
  block text-[#8B8080] font-inter text-[12px]
`;

export const SuggestionTitle = tw.h2`
font-rubik text-[21px] text-white font-bold
`;

export const SuggestionConatiner = tw.div`
flex items-center justify-center flex-col gap-[16px] w-full p-[16px]
`;

export const UserCardInfo = tw.div`
flex gap-[16px]
`;
