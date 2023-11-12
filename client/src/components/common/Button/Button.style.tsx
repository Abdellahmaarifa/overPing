import tw, { styled } from "twin.macro";

export interface ButtonLinkProps {
  $icon?: boolean;
  $size?: "sm" | "md" | "xl" | "auto";
  $border?: boolean;
  $text?: string;
  $theme?: "dark" | "white" | "blue";
  $transparent?: boolean;
  $disabled?: boolean;
  $Icon?: React.FC;
  $link?: string;
  type?: string;
  onClick?: any;
}

const getBaseStyles = () => tw`
  font-inter text-base font-semibold cursor-pointer ease-in-out duration-300 
  relative overflow-hidden h-10 rounded flex items-center justify-center
`;

const getIconGapStyles = (
  icon?: boolean,
  size?: "sm" | "md" | "xl" | "auto"
) => {
  return icon ? (size === "sm" ? tw`gap-2` : tw`gap-3`) : null;
};

const getTextAndBgColorStyles = (
  theme?: "dark" | "white" | "blue",
  transparent?: boolean
) => {
  if (!transparent) {
    return theme === "dark"
      ? tw`text-btn-white bg-btn-black!`
      : theme === "white"
      ? tw`text-btn-black bg-btn-white!`
      : theme === "blue"
      ? tw`text-btn-blue`
      : tw`text-btn-white`;
  } else {
    return tw`text-btn-white`;
  }
};

const getBorderStyles = (
  border?: boolean,
  theme?: "dark" | "white" | "blue"
) => {
  return (
    border &&
    (theme === "blue"
      ? tw`border-[1px] border-solid border-btn-blue`
      : tw`border-[1px] border-solid border-btn-white`)
  );
};

const getBgStyles = (
  transparent?: boolean,
  theme?: "dark" | "white" | "blue"
) => {
  return !transparent && (theme === "blue" ? tw`bg-btn-blue!` : null);
};

const getSizeStyles = (size?: "sm" | "md" | "xl" | "auto") => {
  return size === "md"
    ? tw`w-[148px]`
    : size === "xl"
    ? tw`w-[344px]`
    : size === "sm"
    ? tw`px-4`
    : tw`w-[100%]`;
};

const getTextPaddingStyles = (text?: string) => {
  return !text ? tw`px-2` : null;
};

const getDisabledStyles = (
  disable?: boolean,
  theme?: "dark" | "white" | "blue"
) => {
  if (disable) {
    return theme === "white"
      ? tw`bg-btn-white-disable! text-btn-black-disable`
      : theme === "dark"
      ? tw`bg-btn-black-disable! text-btn-white-disable`
      : tw`brightness-75`;
  } else {
    return tw`hover:brightness-75`;
  }
};

const ButtonLink = styled.button<ButtonLinkProps>(
  ({ $icon, $size, $border, $text, $theme, $transparent, $disabled }) => [
    getBaseStyles(),
    getIconGapStyles($icon, $size),
    getTextAndBgColorStyles($theme, $transparent),
    getBorderStyles($border, $theme),
    getBgStyles($transparent, $theme),
    getSizeStyles($size),
    getTextPaddingStyles($text),
    getDisabledStyles($disabled, $theme),
    $disabled ? tw`after:block` : tw`after:hidden`,
  ]
);

export const IconContainer: React.FC<{ Icon: React.FC }> = ({ Icon }) => {
  return (
    <div tw="[&>*]:w-6 [&>*]:h-6">
      <Icon />
    </div>
  );
};
export default ButtonLink;
