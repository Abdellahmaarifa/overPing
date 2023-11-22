import AboutSection from "components/landingPage/AboutSection/AboutSection";
import FeautueSection from "components/landingPage/FeatureSection/FeatureSection";
import Footer from "components/landingPage/Footer/Footer";
import Header from "components/landingPage/Header/Header";
import PageContainer, { Blob } from "./LandingPage.style";

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
