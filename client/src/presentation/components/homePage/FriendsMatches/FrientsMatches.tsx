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
import { useApolloClient } from "@apollo/client";
import { GetFriendshipStatusDocument } from "gql/index";
import { useUserContext } from "context/user.context";
import toast from "react-hot-toast";
import { GetFriendshipMatchesDocument } from "gql/index";
const test = tw.a``;
interface PlayerType {
  id: number;
  username: string;
  profileImgUrl: string;
  score: number;
  status: boolean;
}

interface MatchType {
  id: number;
  player1: PlayerType;
  player2: PlayerType;
  points: number;
  level: number;
  createdAt: string;
}

const FriendshipMatches = ({ active }: { active: boolean }) => {
  const [page, setPage] = useState(1);
  const [matchList, setMatchList] = useState<MatchType[]>([]);
  const [loading, setLoading] = useState(false);
  const client = useApolloClient();
  const { user } = useUserContext();
  const [end, setEnd] = useState(false);

  const GetFreshData = async (page: number, callback: any) => {
    try {
      setLoading(true);
      const res = await client.query({
        query: GetFriendshipMatchesDocument,
        variables: {
          data: {
            userId: Number(user?.id),
            page: page,
            limit: 5,
          },
        },
        fetchPolicy: "no-cache",
      });
      //console.log("friends matches: ", res);

      if (res.data.getFriendshipMatches) {
        if (res.data.getFriendshipMatches.length == 0) setEnd(true);
        setMatchList(res.data.getFriendshipMatches);
        callback();
      }
      setLoading(false);
    } catch (err: any) {
      toast.error(err.message ? err.message : "can't get the firend's matches");
    }
  };
  useEffect(() => {
    // similiting getting data by page [ex: 19 resault]
    GetFreshData(1, () => {});
    //console.log("getting more data", page);
  }, []);
  return (
    <FriendsMatchesConatiner style={active ? { display: "flex" } : undefined}>
      <FriendsMatchesTitle>Friendship Matches</FriendsMatchesTitle>
      <Resault>
        {matchList.length ? (
          matchList.map((match: MatchType, id) => {
            const winner = match.player1.status ? match.player1 : match.player2;
            const loser = match.player1.status ? match.player2 : match.player1;
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
              <MatchText key={id}>
                <Winner>{winner.username}</Winner>{" "}
                <div>
                  <span tw="xs:inline-block hidden">Wins </span>
                  {` ${winner.score} - ${loser.score} `}
                  <span tw="xs:inline-block hidden">Against </span>
                </div>
                <Loser>{loser.username}</Loser>
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
      {page === 1 && !end && matchList.length == 5 ? (
        <Button
          $text="see more"
          $transparent={true}
          onClick={() =>
            GetFreshData(page + 1, () => setPage((old) => old + 1))
          }
        />
      ) : matchList.length == 5 ? (
        <SeeMoreConatiner>
          <DownArrowIcon
            tw="rotate-90 cursor-pointer w-[16px]"
            onClick={() => {
              setEnd(false);
              GetFreshData(page - 1, () => setPage((old) => old - 1));
            }}
          />

          {matchList.length ? (
            <>
              <SeeMorePageNumber>{page}</SeeMorePageNumber>
              <DownArrowIcon
                tw="-rotate-90 cursor-pointer w-[16px]"
                onClick={() => {
                  GetFreshData(page + 1, () => setPage((old) => old + 1));
                }}
              />
            </>
          ) : null}
        </SeeMoreConatiner>
      ) : null}
    </FriendsMatchesConatiner>
  );
};

export default FriendshipMatches;
