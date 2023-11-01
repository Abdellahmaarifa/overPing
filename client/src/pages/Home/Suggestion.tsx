import React from "react";
import tw from "twin.macro";
import FeatureIcon from "../../assets/home/dice.svg";
import Button from "components/common/Button/Button";

const SuggestionBox = tw.div`
  w-full h-fit min-h-[300px] bg-[#0E1821] flex flex-col items-center justify-start p-[16px] min-w-[300px]
`;

const UserCard = tw.div`
  h-[64px] w-full flex items-center justify-evenly
`;

const UserAvatar = tw.div`
  w-[48px] h-[48px] rounded-[16px]
`;

const UserDetails = tw.div`
  flex flex-col justify-evenly items-start
`;

const UserName = tw.p`
  text-[#B4B5CF] text-[14px] font-normal
`;

const UserHandle = tw.span`
  block text-[#8B8080] font-inter text-[12px]
`;

const Suggestions = () => {
  return (
    <SuggestionBox>
      <h2 tw="font-rubik text-[21px] text-white font-bold">
        Suggestions to play with
      </h2>
      <div tw="flex items-center justify-center flex-col gap-[16px] w-full p-[16px]">
        <UserCard>
          <div tw="flex gap-[16px]">
            <UserAvatar tw="bg-amber-200" />
            <UserDetails>
              <UserName>Salma</UserName>
              <UserHandle>@SalmaUser</UserHandle>
            </UserDetails>
          </div>
          <Button $size="sm" $text="Invite" />
        </UserCard>
        <UserCard>
          <div tw="flex gap-[16px]">
            <UserAvatar tw="bg-amber-300" />
            <UserDetails>
              <UserName>Salma</UserName>
              <UserHandle>@SalmaUser</UserHandle>
            </UserDetails>
          </div>
          <Button $size="sm" $text="Invite" />
        </UserCard>
      </div>
    </SuggestionBox>
  );
};

export default Suggestions;
