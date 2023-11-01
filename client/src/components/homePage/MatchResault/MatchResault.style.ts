import tw, { styled } from "twin.macro";

export const MatchTableCell = tw.td`
    w-full sm:flex-[40%] flex items-center justify-center gap-[10px] flex-col
  `;

export const MatchTableDateCell = tw.th`
    hidden sm:flex sm:flex-[30%] justify-center items-center text-[16px] font-inter text-[#D9D9D9] font-normal
  `;

export const MatchTablePointsCell = styled.th<{ $success: boolean }>(
  ({ $success }) => [
    tw`
    hidden sm:flex sm:flex-[15%] justify-center items-center font-inter text-[20px] font-bold
  `,

    $success ? tw`text-[#3CBD8F]` : tw`text-[#E5818E]`,
  ]
);

export const MatchTableLevelCell = tw.th`
    hidden sm:flex sm:flex-[15%] justify-center items-center text-[#D9D9D9] font-bold text-[20px]
  `;

export const UserRofile = tw.div`
w-[48px] h-[48px] rounded-[16px] bg-red-50
overflow-hidden
[&>*]:w-full [&>*]:h-full
`;

export const ResaultContainer = tw.div`
flex justify-between items-center w-full gap-[10px]
`;

export const Resault = tw.div`
w-[40%] flex justify-between items-center font-rubik font-bold text-[20px] xl:text-[28px] gap-[3px]
`;

export const ScoreConatiner = tw.div`
flex items-center justify-center flex-col min-w-[220px] sm:hidden
`;

export const Score = tw.h4`
font-inter font-normal text-[16px] mb-[5px]
`;

export const ScoreLevel = tw.span`
font-bold font-inter 
`;

export const ScoreSeperator = tw.span`
h-[10px] w-[2px] bg-[#D9D9D9] inline-block ml-[10px] mr-[10px] rounded
`;

export const ScorePoints = styled.span<{ $success: boolean }>(
  ({ $success }) => [
    `
font-bold `,
    $success ? tw`text-[#3CBD8F]` : tw`text-[#E5818E]`,
  ]
);

export const ScoreDate = tw.p`
text-[12px] text-gray-300
`;

export const MatchTableRow = styled.tr<{ $success: boolean }>(
  ({ $success }) => [
    tw`
    flex justify-evenly items-center h-[140px] sm:h-[80px] rounded-[12px] p-[16px]
  `,
    $success ? tw`bg-success-gradient` : tw`bg-failed-gradient`,
  ]
);
