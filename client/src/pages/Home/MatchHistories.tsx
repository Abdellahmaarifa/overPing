import React from "react";
import tw from "twin.macro";

const MatchHistories = () => {
  const MatchHistoryContainer = tw.div`
    w-full rounded-[12px] bg-[#0E1821] text-white font-normal p-[10px]
  `;

  const MatchTable = tw.table`
    w-full flex flex-col gap-[16px]
  `;

  const MatchTableHeader = tw.tr`
    hidden sm:flex justify-evenly items-center font-normal p-[16px]
  `;

  const MatchTableHeaderCell = tw.th`
    font-normal flex sm:flex-[40%] justify-center items-center
  `;

  const MatchTableBody = tw.tbody`
    w-full flex flex-col gap-[16px]
  `;

  const MatchTableRow = tw.tr`
    flex justify-evenly items-center bg-success-gradient h-[140px] sm:h-[80px] rounded-[12px] p-[16px]
  `;

  const MatchTableCell = tw.td`
    w-full sm:flex-[40%] flex items-center justify-center gap-[10px] flex-col
  `;

  const MatchTableDateCell = tw.th`
    hidden sm:flex sm:flex-[30%] justify-center items-center text-[16px] font-inter text-[#D9D9D9] font-normal
  `;

  const MatchTablePointsCell = tw.th`
    hidden sm:flex sm:flex-[15%] justify-center items-center font-inter text-[20px] text-[#3CBD8F] font-bold
  `;

  const MatchTableLevelCell = tw.th`
    hidden sm:flex sm:flex-[15%] justify-center items-center text-[#D9D9D9] font-bold text-[20px]
  `;

  return (
    <>
      <h3 tw="text-[#E8E9F0] font-rubik font-bold text-[18px] xs:hidden lg:block lg:text-[38px] lg:font-normal">
        Match Histories
      </h3>
      <MatchHistoryContainer>
        <MatchTable>
          <MatchTableHeader>
            <MatchTableHeaderCell>Match</MatchTableHeaderCell>
            <MatchTableDateCell>Date</MatchTableDateCell>
            <MatchTablePointsCell>Points</MatchTablePointsCell>
            <MatchTableLevelCell>Level</MatchTableLevelCell>
          </MatchTableHeader>
          <MatchTableBody>
            <MatchTableRow>
              <MatchTableCell>
                <div tw="flex justify-between items-center w-full gap-[10px]">
                  <div tw="w-[48px] h-[48px] rounded-[16px] bg-red-50"></div>
                  <div tw="w-[40%] flex justify-between items-center font-rubik font-bold text-[28px]">
                    <span>11</span>
                    <span>:</span>
                    <span>06</span>
                  </div>
                  <div tw="w-[48px] h-[48px] rounded-[16px] bg-red-50"></div>
                </div>
                <div tw="flex items-center justify-center flex-col min-w-[220px] sm:hidden">
                  <h4 tw="font-inter font-normal text-[16px] mb-[5px]">
                    Level : <span tw="font-bold font-inter ">410</span>{" "}
                    <span tw="h-[10px] w-[2px] bg-[#D9D9D9] inline-block ml-[10px] mr-[10px] rounded"></span>
                    points : <span tw="font-bold text-[#3CBD8F]">3350</span>
                  </h4>
                  <p tw="text-[12px] text-gray-300">Wed 9 2023 02:30PM</p>
                </div>
              </MatchTableCell>
              <MatchTableDateCell>Wed 9 2023 02:30PM</MatchTableDateCell>
              <MatchTablePointsCell>3550</MatchTablePointsCell>
              <MatchTableLevelCell>410</MatchTableLevelCell>
            </MatchTableRow>
            <MatchTableRow>
              <MatchTableCell>
                <div tw="flex justify-between items-center w-full gap-[10px]">
                  <div tw="w-[48px] h-[48px] rounded-[16px] bg-red-50"></div>
                  <div tw="w-[40%] flex justify-between items-center font-rubik font-bold text-[28px]">
                    <span>11</span>
                    <span>:</span>
                    <span>06</span>
                  </div>
                  <div tw="w-[48px] h-[48px] rounded-[16px] bg-red-50"></div>
                </div>
                <div tw="flex items-center justify-center flex-col min-w-[220px] sm:hidden">
                  <h4 tw="font-inter font-normal text-[16px] mb-[5px]">
                    Level : <span tw="font-bold font-inter ">410</span>{" "}
                    <span tw="h-[10px] w-[2px] bg-[#D9D9D9] inline-block ml-[10px] mr-[10px] rounded"></span>
                    points : <span tw="font-bold text-[#E5818E]">3350</span>
                  </h4>
                  <p tw="text-[12px] text-gray-300">Wed 9 2023 02:30PM</p>
                </div>
              </MatchTableCell>
              <MatchTableDateCell>Wed 9 2023 02:30PM</MatchTableDateCell>
              <MatchTablePointsCell>3550</MatchTablePointsCell>
              <MatchTableLevelCell>410</MatchTableLevelCell>
            </MatchTableRow>
          </MatchTableBody>
        </MatchTable>
      </MatchHistoryContainer>
    </>
  );
};

export default MatchHistories;
