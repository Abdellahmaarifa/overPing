import { useSettingsContext } from "context/settings.context";
import Button from "../Button/Button";
import Input from "../Input/Input";
import {
  SettingBackIcon,
  SettingModelContainer,
  SettingModelHeader,
} from "../Settings/Settings.style";
import Switcher from "../Switcher/Switcher";

import BackIcon from "assets/common/back-icon.svg?react";
import { useUserContext } from "context/user.context";
import {
  useEnableTwoFactorAuthMutation,
  useVerifyTwoFactorAuthMutation,
} from "gql/index";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import tw from "twin.macro";
import { SetPassField, SetPassFieldHeading } from "./SetPasswordModel.style";
const a = tw.div``;
const SetPasswordModel = () => {
  const { user, updateUser } = useUserContext();
  const [enable, setEnable] = useState(false);
  const [showVerificationModel, setShowVerificationMdel] = useState(false);
  const [QRcodeImg, setQRcodeImg] = useState<string | undefined>("");
  const [QRcode, setQRcode] = useState<string | null>(null);
  const [enableTwoFactor] = useEnableTwoFactorAuthMutation();
  const [verifyTwoFactorAuth] = useVerifyTwoFactorAuthMutation();

  const {
    SETTINGS_LINKS,
    resetSettings,
    settingsModel: [settingsModel, _],
    settingsNav: [settingsNav, setSettingsNav],
  } = useSettingsContext();
  console.log("this is the user: ", user);
  useEffect(() => {
    setEnable(user?.twoStepVerificationEnabled!);
  }, []);

  const setTwoFactorAuth = async () => {
    if (enable) {
      // should disable the 2FA
      setEnable(false);
    } else {
      await toast.promise(
        enableTwoFactor({
          variables: {
            id: Number(user?.id),
          },
        }),
        {
          loading: "please wait..",
          success: ({ data }: any) => {
            setShowVerificationMdel(true);
            setQRcodeImg(data?.enableTwoFactorAuth);
            console.log(data?.enableTwoFactorAuth);
            return "scan the QR code to enable 2FA.";
          },
          error: (err) => {
            console.log("err from generating 2FA:", err);
            return "somthing went wrong";
          },
        }
      );
    }
  };

  const verifyQr = async (id: number, code: string) => {
    try {
      await toast.promise(
        verifyTwoFactorAuth({
          variables: {
            id,
            code,
          },
        }),
        {
          loading: "loading...",
          success: ({ data }: any) => {
            console.log(data);
            if (!data.verifyTwoFactorAuth) throw new Error("uncorrect code!.");
            setShowVerificationMdel(false);
            setEnable(true);
            setTimeout(() => {
              updateUser({ ...user!, twoStepVerificationEnabled: true });
            }, 1000);
            return "2FA is enabled.";
          },
          error: (err) => {
            console.log("error validaitng the code of 2FA: ", err);
            return "somthing went wrong";
          },
        }
      );
    } catch (err) {
      console.log("err: -- ", err);
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
      <SettingModelHeader>Security</SettingModelHeader>
      {false && (
        <>
          <SetPassField>
            <SetPassFieldHeading>change your password</SetPassFieldHeading>
            <Input
              type="password"
              $size="auto"
              $border={true}
              placeholder="New Password"
            />
            <Input
              type="password"
              $size="auto"
              $border={true}
              placeholder="Repeat New Password"
            />
          </SetPassField>
          <SetPassField>
            <Input
              $size="auto"
              $border={true}
              type="password"
              placeholder="Enter your Current Password (required)"
            />
          </SetPassField>
        </>
      )}
      <SetPassField>
        {!showVerificationModel && (
          <Switcher
            title="Two-Factor Authentication"
            description="You need to set up Google Authenticator on your phone to activate your account."
            enable={enable}
            onChange={() => setTwoFactorAuth()}
          />
        )}
        <SetPassField>
          {showVerificationModel && (
            <div tw="flex flex-col gap-[20px] items-center justify-center">
              <img src={QRcodeImg} alt="" />
              <Input
                placeholder="2FA Code"
                $border={true}
                $size="md"
                onChange={(e: any) => setQRcode(e.target.value)}
              />
            </div>
          )}
        </SetPassField>
        <SetPassField>
          <Button
            $text="submit"
            $size="auto"
            $disabled={!showVerificationModel || !QRcode}
            onClick={() => {
              if (!showVerificationModel || !QRcode) return;
              console.log("sending .. ", QRcode);
              verifyQr(Number(user?.id), QRcode!);
            }}
          />
        </SetPassField>
      </SetPassField>
      <Toaster position="top-center" />
    </SettingModelContainer>
  );
};

export default SetPasswordModel;
