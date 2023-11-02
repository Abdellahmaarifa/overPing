import React from "react";
import tw from "twin.macro";
import {
  FriendsMatchesConatiner,
  MatchText,
  SeeMore,
  Winner,
  Loser,
  FriendsMatchesTitle,
  Resault,
} from "./FriendsMatches.style";
import { faker } from "@faker-js/faker";
type opponent = {
  name: string;
  point: number;
};
const FriendshipMatches = ({ active }: { active: boolean }) => {
  const winner: opponent = {
    name: "salam",
    point: 500,
  };
  const loser: opponent = {
    name: "loser",
    point: 20,
  };

  return active ? (
    <FriendsMatchesConatiner>
      <FriendsMatchesTitle>Friendship Matches</FriendsMatchesTitle>
      <Resault>
        {MatchList.map((match: MatchType) => {
          const winnerPoint =
            match.winner.point.toString().length === 1
              ? `0${match.winner.point}`
              : match.winner.point;
          const loserPoint =
            match.loser.point.toString().length === 1
              ? `0${match.loser.point}`
              : match.loser.point;
          return (
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
        })}
      </Resault>
      <SeeMore href="#">See more</SeeMore>
    </FriendsMatchesConatiner>
  ) : null;
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
const MatchList: MatchType[] = faker.helpers.multiple(createRandomMatch, {
  count: 7,
});
export default FriendshipMatches;
