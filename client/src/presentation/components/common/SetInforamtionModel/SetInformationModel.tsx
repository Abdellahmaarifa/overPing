import { useSettingsContext } from "context/settings.context";
import Button from "../Button/Button";
import Hexagon from "../Hexagon/Hexagon";
import Input from "../Input/Input";
import {
  SettingBackIcon,
  SettingModelContainer,
  SettingModelHeader,
} from "../Settings/Settings.style";

import BackIcon from "assets/common/back-icon.svg?react";
import BannerIcon from "assets/common/banner-icon.svg?react";
import ProfileIcon from "assets/common/profile-icon.svg?react";
import { useUserContext } from "context/user.context";
import {
  useUpdateProfileBgImgMutation,
  useUpdateUserAvatarImgMutation,
  useUpdateUserProfileMutation,
} from "gql/index";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Validate from "../../../../domain/validation/index";
import {
  ChangeBannerCaption,
  ChangeBannerConatiner,
  ChangeBannerIcon,
  ChangeBannerInput,
  ChangeBannerText,
  ChangeInfoField,
  ChangeInfoFieldHeading,
  ChangePhotosContainer,
  ChangeProfile,
  ChangeProfileIcon,
  ChangeProfileInput,
} from "./SetInformationModel.style";
const SetInformationModel = () => {
  const {
    SETTINGS_LINKS,
    resetSettings,
    settingsModel: [settingsModel, _],
    settingsNav: [settingsNav, setSettingsNav],
  } = useSettingsContext();
  const { profile } = useUserContext();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avtarUrl, setAvatarUrl] = useState<string | ArrayBuffer | null>(
    profile?.avatar as string
  );
  const [cover, setCover] = useState<File | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | ArrayBuffer | null>(
    profile?.cover as string
  );
  const [nickname, setNickname] = useState<string | null>(null);
  const [about, setAbout] = useState<string | null>(null);

  const [updateProfileMutation] = useUpdateUserProfileMutation();
  const [updateAvatarMutation] = useUpdateUserAvatarImgMutation();
  const [updateCoverMutation] = useUpdateProfileBgImgMutation();
  const { restoreUser } = useUserContext();
  const navigate = useNavigate();
  const updateProfile = async () => {
    if (!avatar && !about && !nickname && !cover) return;
    // VALIDATE THE DATA FIRST .
    try {
      if (nickname) {
        try {
          await Validate.nickname().validate(nickname);
        } catch (err) {
          toast.error(String(err));
          return;
        }
      }
      if (about) {
        try {
          await Validate.about().validate(about);
        } catch (err) {
          console.log(about, err);
          toast.error(String(err));
          return;
        }
      }

      console.log(
        "updating profile with this data: ",
        avatar,
        cover,
        nickname,
        about
      );
      await toast.promise(
        updateProfileMutation({
          variables: {
            userId: Number(profile?.id),
            UpdateProfileInput: {
              nickname: nickname ? nickname : profile?.nickname,
              about: about ? about : profile?.about,
            },
          },
        }),
        {
          loading: "please wait..",
          success: ({ data }: any) => {
            setTimeout(() => {
              //navigate(`/profile/${profile?.id}`);
              //window.location.replace(`/profile/${profile?.id}`);
            }, 200);
            return "Profile updated!";
          },
          error: (err) => {
            console.log("profile update err: ", err);
            return "something went wrong";
          },
        }
      );

      if (avatar) {
        await toast.promise(
          updateAvatarMutation({
            variables: {
              userId: Number(profile?.id),
              AvatarImage: avatar,
            },
          }),
          {
            loading: "please wait..",
            success: ({ data }: any) => {
              setTimeout(() => {
                //navigate(`/profile/${profile?.id}`);
                //window.location.replace(`/profile/${profile?.id}`);
              }, 200);
              return "avatar updated!";
            },
            error: (err) => {
              console.log("profile update err: ", err);
              return "something went wrong";
            },
          }
        );
      }

      if (cover) {
        await toast.promise(
          updateCoverMutation({
            variables: {
              userId: Number(profile?.id),
              BgImage: cover,
            },
          }),
          {
            loading: "please wait..",
            success: ({ data }: any) => {
              setTimeout(() => {
                //navigate(`/profile/${profile?.id}`);
                //window.location.replace(`/profile/${profile?.id}`);
              }, 200);
              return "cover updated!";
            },
            error: (err) => {
              console.log("profile update err: ", err);
              return "something went wrong";
            },
          }
        );
      }
    } catch (err) {
      toast.error("something went wrong.");
      console.log("error: - ", err);
      return;
    }
  };

  return (
    <SettingModelContainer onClick={(e) => e.stopPropagation()}>
      <SettingBackIcon>
        <BackIcon
          onClick={() => {
            setSettingsNav(SETTINGS_LINKS.HOME);
          }}
        />
      </SettingBackIcon>
      <SettingModelHeader>profile information</SettingModelHeader>
      <ChangePhotosContainer>
        <ChangeBannerConatiner
          style={{
            background: `linear-gradient(90deg, rgba(128, 12, 52, 0.7) 0%, rgb(16, 85, 138, .7) 100%), url(${coverUrl}) center center no-repeat`,
            backgroundSize: "cover",
          }}
        >
          <ChangeBannerInput
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => {
              const fileReader = new FileReader();
              fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                  //setAvatar(fileReader.result);
                  setCoverUrl(fileReader.result);
                }
              };
              if (e.target.files?.length === 0) return;
              fileReader.readAsDataURL(
                e.target.files ? e.target.files[0] : new Blob()
              );
              setCover(e.target.files ? e.target.files[0] : null);
            }}
          />
          <ChangeBannerCaption>
            <ChangeBannerText>change your banner</ChangeBannerText>
            <ChangeBannerIcon>
              <BannerIcon />
            </ChangeBannerIcon>
          </ChangeBannerCaption>
          <ChangeProfile>
            <Hexagon
              width={89}
              height={100}
              outline={true}
              Image={avtarUrl as string}
              stroke="#4B4947"
              percentage={1}
            />
            <ChangeProfileInput
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                const fileReader = new FileReader();
                fileReader.onload = () => {
                  if (fileReader.readyState === 2) {
                    //setAvatar(fileReader.result);
                    setAvatarUrl(fileReader.result);
                  }
                };
                if (e.target.files?.length === 0) return;
                fileReader.readAsDataURL(
                  e.target.files ? e.target.files[0] : new Blob()
                );
                setAvatar(e.target.files ? e.target.files[0] : null);
              }}
            />
            <ChangeProfileIcon>
              <ProfileIcon />
            </ChangeProfileIcon>
          </ChangeProfile>
        </ChangeBannerConatiner>
      </ChangePhotosContainer>

      <ChangeInfoField>
        <ChangeInfoFieldHeading>change your nickname</ChangeInfoFieldHeading>
        <Input
          $border={true}
          placeholder={profile?.nickname}
          $size="auto"
          onChange={(e) => {
            //validate data first!!
            setNickname(e.target.value);
          }}
        />
      </ChangeInfoField>
      <ChangeInfoField>
        <ChangeInfoFieldHeading>change your bio</ChangeInfoFieldHeading>
        {/* <Input
          $border={true}
          placeholder={profile?.about}
          $type="longText"
          $size="auto"
          type="textarea"
        /> */}
        <textarea
          rows={3}
          cols={50}
          maxLength={150}
          style={{
            background: "transparent",
            outline: "none",
            border: ".2px solid #4c4c57b0",
            borderRadius: "5px",
            padding: "6px",
          }}
          placeholder={profile?.about}
          onChange={(e) => {
            setAbout(e.target.value);
          }}
        ></textarea>
      </ChangeInfoField>
      <ChangeInfoField>
        <Button
          $text="submit change"
          $size="auto"
          $disabled={!avatar && !about && !nickname && !cover}
          onClick={() => updateProfile()}
        />
      </ChangeInfoField>
      <Toaster position="top-center" />
    </SettingModelContainer>
  );
};

export default SetInformationModel;
