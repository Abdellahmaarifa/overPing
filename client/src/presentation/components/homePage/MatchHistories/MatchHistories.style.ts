import tw, { styled } from "twin.macro";

export const MatchHistoriesContainer = tw.div`
    w-full rounded-[12px] bg-[#0E1821] text-white font-normal p-[10px] h-fit flex flex-col justify-between items-center gap-[15px] min-h-[368px]
  `;

export const MatchTable = tw.table`
    w-full flex flex-col gap-[16px] flex-[100%]
  `;

export const MatchTableHeader = tw.thead`
    hidden sm:flex justify-evenly items-center font-normal p-[16px]
  `;

export const MatchTableHeaderCell = tw.th`
    font-normal flex sm:flex-[40%] justify-center items-center
  `;

export const MatchTableBody = tw.tbody`
    w-full flex flex-col gap-[16px] relative flex-[100%]
  `;

export const MatchHistoriesTitle = tw.div`
  text-[#E8E9F0] font-rubik font-bold text-[18px] xs:hidden lg:block lg:text-[38px] lg:font-normal
  `;

export const EmptyMatchHistoriesContainer = tw.tr`
h-full flex-[100%] flex justify-center items-center
`;

export const EmptyMatchHistories = tw.td`
text-center text-[#636472] text-[16px]
`;

export const MatchHistoriesWrapper = tw.div`
w-full justify-center items-center flex-col gap-[10px]
`;
