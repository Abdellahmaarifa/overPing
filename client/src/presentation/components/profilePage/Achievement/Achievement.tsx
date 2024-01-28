import { useApolloClient } from "@apollo/client";
import Hexagon from "components/common/Hexagon/Hexagon";
import {
  GetAllAchievementsDocument,
  GetUserAchievementsDocument,
} from "gql/index";
import { useEffect, useState } from "react";
import { AchievementConatiner } from "./Achievement.style";
import { useUserContext } from "context/user.context";

const Achievement = () => {
  const [achievements, setAchievements] = useState<AchievementType[]>([]);
  const { user } = useUserContext();
  const [userAchievements, setuserAchievements] = useState<AchievementType[]>(
    []
  );

  const client = useApolloClient();
  useEffect(() => {
    client
      .query({
        query: GetAllAchievementsDocument,
      })
      .then((data) => {
        //console.log("ach: ", data.data.getAllAchievements);
        setAchievements(data.data.getAllAchievements);
      })
      .catch((err) => {
        console.log(err);
      });

    client
      .query({
        query: GetUserAchievementsDocument,
        variables: {
          userId: Number(user?.id),
        },
      })
      .then((data) => {
        setuserAchievements(data.data.getUserAchievements);
      })
      .catch((err) => {
        console.log(err);
      });
    //setAchievements(getAchievement());
  }, []);

  return (
    <AchievementConatiner>
      {achievements.slice(0, 9).map((ach, index) => {
        const active: boolean = userAchievements.find(
          (el) => el.title === ach.title
        )
          ? true
          : false;

        return (
          <Hexagon
            percentage={100}
            odd={Boolean(index % 2 == 0)}
            Image={ach.imageURL}
            active={active}
            type="achivement"
          />
        );
      })}
    </AchievementConatiner>
  );
};

interface AchievementType {
  image: string;
  title: string;
  requirement: string;
  description: string;
  imageURL: string;
}
// const createAchievement = (): AchievementType => {
//   return { image: faker.image.urlLoremFlickr({ category: "night" }) };
// };
// const getAchievement = () =>
//   faker.helpers.multiple(createAchievement, { count: 9 });
export default Achievement;
