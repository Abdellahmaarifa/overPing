import Button from "components/common/Button/Button";
import { useUserContext } from "context/user.context";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useHomeQuery, useLogoutMutation } from "../../graphql";
import PingBoy from "assets/home/ping_boy.png";
import featureIcon from "assets/home/dice.svg";
import WelcomBannerImage from "assets/home/welcome_banner.png";
import tw from "twin.macro";
import HomeBanner from "components/homePage/HomeBanner/HomeBanner";
import Features from "./Features";
import Suggestions from "./Suggestion";
import FriendshipMatchesComponent from "./FrientshipMatches";
import FriendshipMatches from "./MatchHistories";
import { HomeConatiner, HomeBody, OverViewConatiner } from "./Home.style";
import HomeOverView from "./HomeOverView";

const Home = () => {
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
