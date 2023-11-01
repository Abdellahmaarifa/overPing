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

type opponent = {
  name: string;
  point: number;
};
const FriendshipMatches = () => {
  const winner: opponent = {
    name: "salam",
    point: 500,
  };
  const loser: opponent = {
    name: "loser",
    point: 20,
  };

  return (
    <FriendsMatchesConatiner>
      <FriendsMatchesTitle>Friendship Matches</FriendsMatchesTitle>
      <Resault>
        <MatchText>
          <Winner>{winner.name}</Winner>{" "}
          {`Wins: ${winner.point} - ${loser.point} Against`}{" "}
          <Loser>{loser.name}</Loser>
        </MatchText>
      </Resault>
      <SeeMore href="#">See more</SeeMore>
    </FriendsMatchesConatiner>
  );
};

export default FriendshipMatches;
