import tw, { styled } from "twin.macro";

export const ChannelMembersContainer = tw.div`
    w-full
    h-full
    flex
    flex-col
    gap-[32px]
    [padding:40px 8px]
`;

export const ChannelMembersSearch = tw.div`
    w-full
    relative
`;
export const ChannelMembersSearchInput = tw.input`
    w-full
    bg-[#161C21]
    outline-none
    focus:outline-none
    border-solid
    border-[1px]
    border-[#161C21]
    rounded-[4px]
    h-[40px]
    [padding: 8px 12px]
    placeholder:text-[#4C4C57]

`;
export const ChannelMembersSearchIcon = tw.div`
    w-[24px]
    h-[24px]
    [&>*]:w-full
    [&>*]:h-full
    [&>*]:fill-[#4C4C57]
    absolute
    right-[8px]
    top-1/2
    -translate-y-1/2
`;

export const ChannelMembersBody = tw.div`
    w-full
    h-full
    overflow-scroll
    flex
    flex-col
    gap-[8px]
    [padding: 0 16px]
`;

export const ChannelMembersGroup = tw.div`
    flex
    flex-col
`;

export const ChannelMembersGroupHeader = tw.h2`
    text-[#B4B5CF]
    font-inter
    text-[14px]
    [font-weight: 500]
`;

export const ChannelMembersGroupBody = tw.div`
    flex
    flex-col
    gap-[8px]
`;

export const ChannelMember = tw.div`
    [padding: 8px 12px]
    flex
    gap-[8px]
    relative
`;
export const ChannelMemberName = styled.h3<any>(({ muted }) => [
  tw`
    font-inter
    text-[14px]
    text-[#B4B5CF]
    [font-weight: 500]
`,
  muted && tw`text-[#3a454f]`,
]);
export const ChannelMemberPhoto = styled.img<any>(({ muted }) => [
  tw`
    w-[48px]
    h-[48px]
    rounded-[16px]
    border-[3px]
    border-solid
    border-[#4C4C57]
`,
  muted && tw`opacity-[.2]`,
]);
