import PingBoy from "assets/home/ping_boy.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { useUserQuery } from "gql";
import {
  BannerContainer,
  BannerImage,
  BannerSubtitle,
  BannerText,
  BannerTitle,
  Span,
} from "./HomeBanner.style";
import tw from "twin.macro";
const HomeBanner = () => {
  const { data, loading, error } = useUserQuery();
  const navigate = useNavigate();
  //if (loading || true) return <Skeleton />;
  if (error) {
    console.log(error);
    navigate("/error");
  }
  return (
    <BannerContainer>
      <BannerText>
        <BannerTitle>
          {loading ? (
            <Skeleton
              height={20}
              style={{ position: "absolute", width: "85%" }}
            />
          ) : (
            <>
              Welcome Back <Span>{data?.user.userName}</Span>
            </>
          )}
        </BannerTitle>
        <BannerSubtitle>
          {loading ? (
            <>
              <Skeleton
                height={15}
                count={2}
                style={{ position: "absolute", width: "85%" }}
              />
              <Skeleton
                height={15}
                style={{ position: "absolute", width: "35%" }}
              />
            </>
          ) : (
            <>
              Play today with us, find and discover the best player in our game,
              chat and get to know other people.
            </>
          )}
        </BannerSubtitle>
      </BannerText>

      <BannerImage src={PingBoy} alt="overping" />
    </BannerContainer>
  );
};

export default HomeBanner;
