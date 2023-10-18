import AboutSection from "components/landingPage/AboutSection/AboutSection";
import FeautueSection from "components/landingPage/FeatureSection/FeatureSection";
import Footer from "components/landingPage/Footer/Footer";
import Header from "components/landingPage/Header/Header";
import tw from "twin.macro";
import PageContainer from "./LandingPage.style";

const Cont = tw.div`
  w-[110vw] h-[110vw] absolute rounded-full  bg-ellipsLinearGradient filter blur-md left-1/2  -translate-y-1/2 -translate-x-1/2 overflow-hidden max-w-[1408px] max-h-[1408px]
`;

const LandingPage = () => {
  return (
    <PageContainer>
      <Cont />
      <Header />
      <FeautueSection />
      <AboutSection />
      <Footer />
    </PageContainer>
  );
};

export default LandingPage;
