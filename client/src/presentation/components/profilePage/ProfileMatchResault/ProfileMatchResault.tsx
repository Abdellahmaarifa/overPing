import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import {
  MatchResault,
  ProfileMatchResalutImage,
  ProfileMatchResaultContainer,
  ProfileMatchResaultHeading,
  ProfileResalut,
  ProfileSeeMore,
} from "./ProfileMatchResault.style";
import DownIcon from "assets/common/down-arrow.svg?react";
const ProfileMatchResault = () => {
  const [resault, setResault] = useState<MatchResaultType[]>([]);

  useEffect(() => {
    setResault(getMatchesResault());
  }, []);

  return (
    <ProfileMatchResaultContainer>
      <ProfileMatchResaultHeading>Match Histories</ProfileMatchResaultHeading>
      {resault.map((resault) => {
        const win = resault.userScore >= resault.opponentScore;
        return (
          <ProfileResalut
            style={{
              background: win
                ? "linear-gradient(90deg, rgba(31, 112, 183, 0.01) 0%, rgba(70, 143, 207, 0.08) 49.42%, rgba(31, 112, 183, 0.01) 100%)"
                : "linear-gradient(90deg, rgba(31, 112, 183, 0.01) 0%, rgba(219, 107, 107, 0.08) 48.21%, rgba(31, 112, 183, 0.01) 100%)",
            }}
          >
            <ProfileMatchResalutImage
              src={win ? resault.userImage : resault.opponentImage}
            />
            <MatchResault>
              <span>
                {win
                  ? resault.userScore.toString().padStart(2, "0")
                  : resault.opponentScore.toString().padStart(2, "0")}
              </span>
              <span>:</span>
              <span>
                {!win
                  ? resault.userScore.toString().padStart(2, "0")
                  : resault.opponentScore.toString().padStart(2, "0")}
              </span>
            </MatchResault>
            <ProfileMatchResalutImage
              src={win ? resault.opponentImage : resault.userImage}
            />
          </ProfileResalut>
        );
      })}
      <ProfileSeeMore>
        <DownIcon />
        <span>load more</span>
      </ProfileSeeMore>
    </ProfileMatchResaultContainer>
  );
};

interface MatchResaultType {
  userImage: string;
  opponentImage: string;
  userScore: number;
  opponentScore: number;
}
const createRandomMatchResault = (): MatchResaultType => {
  return {
    userImage: faker.image.avatar(),
    opponentImage: faker.image.avatar(),
    userScore: faker.number.int() % 100,
    opponentScore: faker.number.int() % 100,
  };
};

const getMatchesResault = () =>
  faker.helpers.multiple(createRandomMatchResault, { count: 5 });
export default ProfileMatchResault;
