import tw, { styled } from "twin.macro";

export const MatchHistoryContainer = tw.div`
    w-full rounded-[12px] bg-[#0E1821] text-white font-normal p-[10px] h-fit flex flex-col justify-center items-center gap-[15px]
  `;

export const MatchTable = tw.table`
    w-full flex flex-col gap-[16px]
  `;

export const MatchTableHeader = tw.thead`
    hidden sm:flex justify-evenly items-center font-normal p-[16px]
  `;

export const MatchTableHeaderCell = tw.th`
    font-normal flex sm:flex-[40%] justify-center items-center
  `;

export const MatchTableBody = tw.tbody`
    w-full flex flex-col gap-[16px] relative
  `;

export const MatchHistoriesTitle = tw.div`
  text-[#E8E9F0] font-rubik font-bold text-[18px] xs:hidden lg:block lg:text-[38px] lg:font-normal
  `;
