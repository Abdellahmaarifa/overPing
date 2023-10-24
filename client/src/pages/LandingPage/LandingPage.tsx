import AboutSection from "components/landingPage/AboutSection/AboutSection";
import FeautueSection from "components/landingPage/FeatureSection/FeatureSection";
import Footer from "components/landingPage/Footer/Footer";
import Header from "components/landingPage/Header/Header";
import tw from "twin.macro";
import PageContainer, { Blob } from "./LandingPage.style";
import { useHomeQuery } from "../../graphql";
import { useUserContext } from "context/user.context";

const LandingPage = () => {
  return (
    <PageContainer>
      <Blob />
      <Header />
      <FeautueSection />
      <AboutSection />
      <Footer />
    </PageContainer>
  );
};

export default LandingPage;
