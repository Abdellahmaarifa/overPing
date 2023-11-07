import Features from "components/homePage/Features/Features";
import HomeBanner from "components/homePage/HomeBanner/HomeBanner";

import HomeOverView from "../../components/homePage/HomeOverview/HomeOverview";
import { HomeBody, HomeConatiner, OverViewConatiner } from "./Home.style";

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
