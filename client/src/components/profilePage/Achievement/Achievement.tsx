import { AchievementConatiner } from "./Achievement.style";
import Hexagon from "components/common/Hexagon/Hexagon";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

const Achievement = () => {
  const [achievements, setAchievements] = useState<AchievementType[]>([]);
  useEffect(() => {
    setAchievements(getAchievement());
  }, []);

  return (
    <AchievementConatiner>
      {achievements.map((ach, index) => (
        <Hexagon percentage={100} odd={Boolean(index % 2 == 0)} />
      ))}
    </AchievementConatiner>
  );
};

interface AchievementType {
  image: string;
}
const createAchievement = (): AchievementType => {
  return { image: faker.image.avatar() };
};
const getAchievement = () =>
  faker.helpers.multiple(createAchievement, { count: 9 });
export default Achievement;
