import PingBoy from "assets/home/ping_boy.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { useUserQuery } from "gql/index";
import {
  BannerContainer,
  BannerImage,
  BannerSubtitle,
  BannerText,
  BannerTitle,
  Span,
} from "./HomeBanner.style";
import tw from "twin.macro";
import { useUserContext } from "context/user.context";
const HomeBanner = () => {
  // const { data, loading, error } = useUserQuery({
  //   variables:{
  //     id:1
  //   }
  // });
  //const user = data.findUserById;
  const navigate = useNavigate();
  //if (loading || true) return <Skeleton />;
  // if (error) {
  //   console.log(error);
  //   navigate("/error");
  // }
  const { user } = useUserContext();
  return (
    <BannerContainer>
      <BannerText>
        <BannerTitle>
          {
            <>
              Welcome Back <Span>{user?.username}</Span>
            </>
          }
        </BannerTitle>
        <BannerSubtitle>
          {
            <>
              Play today with us, find and discover the best player in our game,
              chat and get to know other people.
            </>
          }
        </BannerSubtitle>
      </BannerText>

      <BannerImage src={PingBoy} alt="overping" />
    </BannerContainer>
  );
};

export default HomeBanner;
