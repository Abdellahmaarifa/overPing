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
import { useEnableTwoFactorAuthMutation, useVerifyTwoFactorAuthMutation } from "gql";
import { DOMElement, MouseEvent, useEffect, useState } from "react";
import { SetPassField, SetPassFieldHeading } from "./SetPasswordModel.style";
import tw from "twin.macro";
const a = tw.div``;
const SetPasswordModel = () => {
  const {user} = useUserContext();
  const [enable, setEnable] = useState(false);
  const [showVerificationModel, setShowVerificationMdel] = useState(false);
  const [QRcodeImg, setQRcodeImg] = useState<String | undefined>("");
  const [QRcode, setQRcode] = useState<string | null>(null);
  const [enableTwoFactor] = useEnableTwoFactorAuthMutation();
  const [verifyTwoFactorAuth] = useVerifyTwoFactorAuthMutation();
  const {
    SETTINGS_LINKS,
    resetSettings,
    settingsModel: [settingsModel, _],
    settingsNav: [settingsNav, setSettingsNav],
  } = useSettingsContext();
  console.log("this is the user: ",user);
  useEffect(()=>{
    setEnable(user?.twoStepVerificationEnabled);
  }, [])

  const setTwoFactorAuth = async () => {
    if (enable)
    {
      // should disable the 2FA
      setEnable(false);
    }
    else {
      setShowVerificationMdel(true);

      const {data} = await enableTwoFactor({
          variables:{
            id:Number(user.id)
        }
      });
      setQRcodeImg(data?.enableTwoFactorAuth);
      setEnable(true);
      console.log(data?.enableTwoFactorAuth);
      
    }
  }

  const verifyQr = async (id:number, code:string) => {
    try {
    const {data} = await verifyTwoFactorAuth(
      {
        variables:{
          id,
          code
        }
      }
    )
    console.log(data);
    setShowVerificationMdel(false);

    }catch(err){
      console.log("err: -- ", err)
    }
  }
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
      {false &&
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
      }
      <SetPassField>
        {!showVerificationModel && <Switcher
          title="Two-Factor Authentication"
          description="You need to set up Google Authenticator on your phone to activate your account."
          enable={enable}
          onChange={() => setTwoFactorAuth()}
        />}
        <SetPassField>
          {showVerificationModel && <div tw="flex flex-col gap-[20px] items-center justify-center">
              <img src={QRcodeImg} alt="" />
              <Input
                placeholder="2FA Code"
                $border={true}
                $size="md"
                onChange={(e : any) => setQRcode(e.target.value)}
              />
            </div>}
        </SetPassField>
        <SetPassField>
          <Button $text="submit" $size="auto" $disabled={!showVerificationModel} 
          onClick={() => {
            console.log("sending .. " ,QRcode)
            verifyQr(Number(user.id), QRcode!);
          }}
          />
        </SetPassField>
      </SetPassField>
    </SettingModelContainer>
  );
};

export default SetPasswordModel;
