import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import {
  MatchResault,
  ProfileMatchResalutImage,
  ProfileMatchResaultContainer,
  ProfileMatchResaultHeading,
  ProfileResalut,
  ProfileSeeMore,
} from "./ProfileMatchResault.style";
import DownIcon from "assets/common/down-arrow.svg?react";
import toast from "react-hot-toast";
import { useApolloClient } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GetUserMatchHistoryDocument } from "gql/index";
import { MatchType } from "components/homePage/MatchHistories/MatchHistories";
import { useUserContext } from "context/user.context";

const ProfileMatchResault = () => {
  const [resault, setResault] = useState<MatchType[] | []>([]);
  const client = useApolloClient();
  const { id } = useParams();
  const { user } = useUserContext();
  const getMatchesResault = async () => {
    try {
      const res = await client.query({
        query: GetUserMatchHistoryDocument,
        variables: {
          data: {
            userId: Number(id),
            page: 1,
            limit: 5,
          },
        },
        fetchPolicy: "no-cache",
      });
      console.log("DATA >>>> : ", res);
      if (res.data.getUserMatchHistoryDocument) {
        setResault(res.data.getUserMatchHistoryDocument);
      }
    } catch (err: any) {
      toast.error(
        err.message ? err.message : "can't get the user match histories"
      );
    }
  };
  useEffect(() => {
    getMatchesResault();
  }, []);

  return (
    <ProfileMatchResaultContainer>
      {resault.length > 0 && (
        <ProfileMatchResaultHeading>Match Histories</ProfileMatchResaultHeading>
      )}
      {resault.map((resault: MatchType) => {
        const win =
          Number(user?.id) == resault.player1.id
            ? resault.player1.status
            : resault.player2.status;
        return (
          <ProfileResalut
            style={{
              background: win
                ? "linear-gradient(90deg, rgba(31, 112, 183, 0.01) 0%, rgba(70, 143, 207, 0.08) 49.42%, rgba(31, 112, 183, 0.01) 100%)"
                : "linear-gradient(90deg, rgba(31, 112, 183, 0.01) 0%, rgba(219, 107, 107, 0.08) 48.21%, rgba(31, 112, 183, 0.01) 100%)",
            }}
          >
            <ProfileMatchResalutImage src={resault.player1.profileImgUrl} />
            <MatchResault>
              <span>{resault.player1.score.toString().padStart(2, "0")}</span>
              <span>:</span>
              <span>{resault.player2.score.toString().padStart(2, "0")}</span>
            </MatchResault>
            <ProfileMatchResalutImage src={resault.player2.profileImgUrl} />
          </ProfileResalut>
        );
      })}
      {/* <ProfileSeeMore>
        <DownIcon />
        <span>load more</span>
      </ProfileSeeMore> */}
    </ProfileMatchResaultContainer>
  );
};

export default ProfileMatchResault;
