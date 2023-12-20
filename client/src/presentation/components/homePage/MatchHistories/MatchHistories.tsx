import { faker } from "@faker-js/faker";
import MatchResault, {
  MatchResaultSkeleton,
} from "../MatchResault/MatchResault";
import {
  EmptyMatchHistories,
  EmptyMatchHistoriesContainer,
  MatchHistoriesTitle,
  MatchHistoriesWrapper,
  MatchHistoriesContainer,
  MatchTable,
  MatchTableBody,
  MatchTableHeader,
  MatchTableHeaderCell,
} from "./MatchHistories.style";
import { MatchResaultType } from "types/home.type";
import { useUserQuery } from "gql";
import tw from "twin.macro";
import { useEffect, useRef, useState } from "react";
import Button from "components/common/Button/Button";
import { sleep } from "helpers";
import StepLink from "components/common/StepLink/StepLink";

const MatchHistories = ({ active }: { active: boolean }) => {
  const { data, loading, error } = useUserQuery();
  const [matchList, setMatchList] = useState<MatchResaultType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const seemoreRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    //similate quering the data from the server.
    setMatchList(getMatchesHistory());
  }, []);
  console.log(matchList);
  return (
    <MatchHistoriesWrapper
      style={{
        display: active ? "flex" : "none",
      }}
    >
      <MatchHistoriesTitle>Match Histories</MatchHistoriesTitle>
      <MatchHistoriesContainer>
        <MatchTable>
          <MatchTableHeader>
            <tr tw="flex justify-evenly w-full">
              <MatchTableHeaderCell tw="flex-[40%]">Match</MatchTableHeaderCell>
              <MatchTableHeaderCell tw="flex-[30%]">Date</MatchTableHeaderCell>
              <MatchTableHeaderCell tw="flex-[15%]">
                Points
              </MatchTableHeaderCell>
              <MatchTableHeaderCell tw="flex-[15%]">Level</MatchTableHeaderCell>
            </tr>
          </MatchTableHeader>
          <MatchTableBody>
            {matchList.length ? (
              matchList.map((match: MatchResaultType) =>
                loading ? (
                  <MatchResaultSkeleton _key={match.id} />
                ) : (
                  <MatchResault
                    {...{
                      ...match,
                      userImage: data?.user.profilePhoto as string,
                    }}
                  />
                )
              )
            ) : (
              <EmptyMatchHistoriesContainer>
                <EmptyMatchHistories>
                  Your ping pong adventure is waiting for your epic strokes!
                  🏓✨ Let's get that ball rolling!
                </EmptyMatchHistories>
              </EmptyMatchHistoriesContainer>
            )}
            {isLoading
              ? matchList
                  .slice(0, 5)
                  .map((el, c) => <MatchResaultSkeleton _key={c.toString()} />)
              : null}
          </MatchTableBody>
        </MatchTable>
        <div ref={seemoreRef}>
          <Button
            $text="see more"
            $transparent={true}
            onClick={async () => {
              setIsLoading(true);
              await sleep(100);
              seemoreRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
              });
              await sleep(500);
              setIsLoading(false);
              setMatchList([...matchList, ...getMatchesHistory()]);
            }}
          />
        </div>
      </MatchHistoriesContainer>
    </MatchHistoriesWrapper>
  );
};

const createRandomMatchResault = (): MatchResaultType => {
  return {
    id: faker.string.uuid(),
    userImage: faker.image.avatar(),
    opponentIamge: faker.image.avatar(),
    userScore: faker.number.int() % 100,
    opponentScore: faker.number.int() % 100,
    matchDate: faker.date.past(),
    points: faker.number.int() % 100,
    level: faker.number.int() % 100,
  };
};

const getMatchesHistory = () =>
  faker.helpers.multiple(createRandomMatchResault, { count: 5 });
export default MatchHistories;
