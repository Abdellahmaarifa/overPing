import { faker } from "@faker-js/faker";
import Button from "components/common/Button/Button";
import { sleep } from "helpers/index";
import { useEffect, useState } from "react";
import DownArrowIcon from "assets/common/downArrow.svg?react";
import {
  EmptyResault,
  EmptyResaultConatiner,
  FriendsMatchesConatiner,
  FriendsMatchesTitle,
  Loser,
  MatchText,
  Resault,
  SeeMoreConatiner,
  SeeMorePageNumber,
  Winner,
} from "./FriendsMatches.style";
import Skeleton from "react-loading-skeleton";
import tw from "twin.macro";
const test = tw.a``;
type opponent = {
  name: string;
  point: number;
};
const FriendshipMatches = ({ active }: { active: boolean }) => {
  const [page, setPage] = useState(0);
  const [matchList, setMatchList] = useState<MatchType[]>([]);
  const [loading, setLoading] = useState(false);
  const winner: opponent = {
    name: "salam",
    point: 500,
  };
  const loser: opponent = {
    name: "loser",
    point: 20,
  };

  useEffect(() => {
    // similiting getting data by page [ex: 19 resault]
    (async () => {
      setLoading(true);
      let data = await getMatchList(page);
      setMatchList(data);
      setLoading(false);
    })();
    //console.log("getting more data", page);
  }, [page]);
  return (
    <FriendsMatchesConatiner style={active ? { display: "flex" } : undefined}>
      <FriendsMatchesTitle>Friendship Matches</FriendsMatchesTitle>
      <Resault>
        {matchList.length ? (
          matchList.map((match: MatchType) => {
            const winnerPoint =
              match.winner.point.toString().length === 1
                ? `0${match.winner.point}`
                : match.winner.point;
            const loserPoint =
              match.loser.point.toString().length === 1
                ? `0${match.loser.point}`
                : match.loser.point;
            return loading ? (
              <Skeleton
                style={{
                  position: "absolute",
                  width: "80%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  height: "30px",
                }}
              />
            ) : (
              <MatchText>
                <Winner>{match.winner.name}</Winner>{" "}
                <div>
                  <span tw="xs:inline-block hidden">Wins </span>
                  {` ${winnerPoint} - ${loserPoint} `}
                  <span tw="xs:inline-block hidden">Against </span>
                </div>
                <Loser>{match.loser.name}</Loser>
              </MatchText>
            );
          })
        ) : (
          <EmptyResaultConatiner>
            <EmptyResault>
              <span tw="block text-[18px]">Oops!</span> No{" "}
              {page > 0 ? "more" : ""} friend matches found. Looks like your
              friends are playing hide and seek. Time to step up your detective
              game! <span tw="block">🕵️‍♂️🔍</span>
            </EmptyResault>
          </EmptyResaultConatiner>
        )}
      </Resault>
      {page === 0 ? (
        <Button
          $text="see more"
          $transparent={true}
          onClick={() => setPage(page + 1)}
        />
      ) : (
        <SeeMoreConatiner>
          <DownArrowIcon
            tw="rotate-90 cursor-pointer w-[16px]"
            onClick={() => {
              setPage(page - 1);
            }}
          />

          {matchList.length ? (
            <>
              <SeeMorePageNumber>{page + 1}</SeeMorePageNumber>
              <DownArrowIcon
                tw="-rotate-90 cursor-pointer w-[16px]"
                onClick={() => {
                  setPage(page + 1);
                }}
              />
            </>
          ) : null}
        </SeeMoreConatiner>
      )}
    </FriendsMatchesConatiner>
  );
};

interface MatchType {
  winner: {
    name: string;
    point: number;
  };
  loser: {
    name: string;
    point: number;
  };
}
const createRandomMatch = (): MatchType => {
  return {
    winner: {
      name: faker.person.firstName(),
      point: faker.number.int() % 100,
    },
    loser: {
      name: faker.person.firstName(),
      point: faker.number.int() % 100,
    },
  };
};
const getMatchList = async (page: number): Promise<MatchType[]> => {
  const promis = new Promise<MatchType[]>(async (res, rej) => {
    await sleep(400);
    res(
      page < 3
        ? faker.helpers.multiple(createRandomMatch, {
            count: page === 2 ? 5 : 7,
          })
        : []
    );
  });
  return promis;
};
export default FriendshipMatches;
