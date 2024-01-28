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
import { MatchResaultType } from "domain/model/home.type";
import { GetUserMatchHistoryDocument, useGetUserQuery } from "gql/index";
import tw from "twin.macro";
import { useEffect, useRef, useState } from "react";
import Button from "components/common/Button/Button";
import { sleep } from "helpers/index";
import StepLink from "components/common/StepLink/StepLink";
import { ApolloQueryResult, useApolloClient } from "@apollo/client";
import { useUserContext } from "context/user.context";
import toast from "react-hot-toast";

export interface PlayerType {
  id: number;
  username: string;
  profileImgUrl: string;
  score: number;
  status: boolean;
}

export interface MatchType {
  id: number;
  player1: PlayerType;
  player2: PlayerType;
  points: number;
  level: number;
  createdAt: string;
}

const MatchHistories = ({ active }: { active: boolean }) => {
  const { data, loading, error } = useGetUserQuery();
  const [matchList, setMatchList] = useState<MatchType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const seemoreRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [end, setEnd] = useState(false);
  const client = useApolloClient();
  const { user } = useUserContext();

  const getMatchesHistories = async (page: number): Promise<any> => {
    const data: any = await client.query({
      query: GetUserMatchHistoryDocument,
      variables: {
        data: {
          userId: Number(user?.id),
          page: page,
          limit: 5,
        },
      },
      fetchPolicy: "no-cache",
    });
    console.log("from server: ", data);
    if (!data.data.getUserMatchHistory)
      throw { message: "can't get history f the user" };
    // console.error("AFTER QUERY : ", data);
    return data.data.getUserMatchHistory;
  };

  const setMatches = async () => {
    try {
      const res: MatchType[] = (await getMatchesHistories(page)) as MatchType[];
      console.log("data:", res);
      if (res?.length > 0) {
        setMatchList([...matchList, ...res]);
        setPage(page + 1);
      }
      if (res.length == 0) setEnd(true);
    } catch (err: any) {
      toast.error(err?.message ? err?.message : err);
    }
  };
  useEffect(() => {
    //similate quering the data from the server.
    setMatches();
    //setMatchList(getMatchesHistory());
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
              {/* <MatchTableHeaderCell tw="flex-[30%]">Points</MatchTableHeaderCell> */}
              <MatchTableHeaderCell tw="flex-[15%]">Points</MatchTableHeaderCell>
              <MatchTableHeaderCell tw="flex-[15%]">Rank</MatchTableHeaderCell>
            </tr>
          </MatchTableHeader>
          <MatchTableBody>
            {matchList.length ? (
              matchList.map((match: MatchType) =>
                loading ? (
                  <MatchResaultSkeleton key={match.id} />
                ) : (
                  <MatchResault
                    key={match.id}
                    id={match.id}
                    userImage={match.player1.profileImgUrl}
                    opponentIamge={match.player2.profileImgUrl}
                    opponentScore={match.player2.score}
                    userScore={match.player1.score}
                    matchDate={new Date(match.createdAt)}
                    points={match.points}
                    level={match.level}
                    isWin={
                      Number(user?.id) == match.player1.id
                        ? match.player1.status
                        : match.player2.status
                    }
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
                  .map((el, c) => <MatchResaultSkeleton key={c} />)
              : null}
          </MatchTableBody>
        </MatchTable>
        <div ref={seemoreRef}>
          {!end && matchList.length == 5 && (
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
                await setMatches();
              }}
            />
          )}
        </div>
      </MatchHistoriesContainer>
    </MatchHistoriesWrapper>
  );
};

export default MatchHistories;
