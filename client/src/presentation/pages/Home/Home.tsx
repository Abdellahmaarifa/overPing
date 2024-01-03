import Features from "components/homePage/Features/Features";
import HomeBanner from "components/homePage/HomeBanner/HomeBanner";
import HomeOverView from "../../components/homePage/HomeOverview/HomeOverview";
import { HomeBody, HomeConatiner, OverViewConatiner } from "./Home.style";
import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { useUserContext } from "context/user.context";
import { useSettingsContext, SETTINGS_LINKS } from "context/settings.context";
import { useUpdateUserMutation } from "gql/index";

const Home = () => {
  const { user, profile, updateUser } = useUserContext();
  const { settingsModel, settingsNav } = useSettingsContext();
  const [updateUserMutation] = useUpdateUserMutation();
  useEffect(() => {
    if (user) {
      if (!user.showUpdateWin) {
        settingsModel[1](true);
        settingsNav[1](SETTINGS_LINKS.USER_INFORMATION);
        updateUserMutation({
          variables: {
            userUpdateInput: {
              showUpdateWin: true,
              email: user.email!,
            },
          },
        });
        updateUser({ ...user, showUpdateWin: true });
      }
    }
  }, []);
  return (
    <HomeConatiner>
      <HomeBody>
        <HomeBanner />
        <Features />
        <OverViewConatiner>
          <HomeOverView />
        </OverViewConatiner>
      </HomeBody>
    </HomeConatiner>
  );
};

export default Home;
