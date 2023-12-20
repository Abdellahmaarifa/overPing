import tw, { styled } from "twin.macro";
import { Field } from "formik";
interface IconPass {
  activeIcon: React.FC;
  defaultIcon: React.FC;
  handler: any;
  active: Boolean;
}
export interface InputBoxProps {
  $type?: string;
  $border?: boolean;
  $size?: string;
  $showPass?: boolean;
  $placeholder?: string;
  $bgColor?: string;
  $Icon?: IconPass;
  $theme?: string;
  $state?: "valid" | "invalid";
}
const getGlobalStyle = () => {
  return tw`relative  gap-[10px] py-[4px] px-[8px] rounded-[4px] focus:outline-none text-[#B4B5CF] font-rubik text-[16px] font-normal pr-[40px]`;
};
const getBorderStyle = (border?: boolean) => {
  return border
    ? tw`border-solid border-[#4C4C57] border-[1px]`
    : tw`border-solid border-[#4C4C57] border-b-[1px]`;
};

const getBackgroundColor = (bgColor?: string) => {
  return bgColor === "dark"
    ? tw`bg-[#1C232A] placeholder:text-[#4C4C57]`
    : bgColor === "darker"
    ? tw`bg-[#161C21] placeholder:text-[#4C4C57] border-[#161C21]`
    : tw`bg-[transparent]`;
};

const getPlaceholderStyle = (placeholder?: string) => {
  return placeholder
    ? tw`placeholder-[#B4B5CF] font-rubik  font-normal text-[16px]`
    : tw``;
};

const getCustomTheme = (theme?: string) => {
  return theme === "grey"
    ? tw`border-[#4C4C57] bg-[transparent] placeholder-[#4C4C57]`
    : tw``;
};
const getStateColor = (state?: string) => {
  if (!state) return tw``;
  return state === "valid" ? tw`border-[#34e4a2]` : tw`border-[#f5425c]`;
};

const getTypeStyle = (type?: string) => {
  if (type === "longText")
    return tw`h-[90px] justify-start items-start flex text-start`;
  if (type === "QR")
    return tw`w-[160px] h-[160px] text-[12px] justify-center items-center text-center pr-[0]`;
};
const getSizeStyle = (size?: string) => {
  if (size === "auto") return tw`w-full h-[40px]`;
  if (size === "md") return tw`w-[160px] h-[40px]`;
  if (size) return tw`w-[344px] h-[40px]`;
};
const InputBox = styled.input<InputBoxProps>(
  ({ $type, $border, $size, $placeholder, $bgColor, $theme, $state }) => [
    getGlobalStyle(),
    getBorderStyle($border),
    getBackgroundColor($bgColor),
    getPlaceholderStyle($placeholder),
    getCustomTheme($theme),
    getStateColor($state),
    getSizeStyle($size),
    getTypeStyle($type),
  ]
);

export const InputBoxIcon = ({ Icon }: { Icon: IconPass }) => {
  return (
    <div
      onClick={() => Icon.handler(!Icon.active)}
      tw="absolute right-[8px] top-1/2 -translate-y-1/2 w-6 h-6 cursor-pointer [&>*]:h-6 [&>*]:w-6"
    >
      {Icon.active ? <Icon.defaultIcon /> : <Icon.activeIcon />}
    </div>
  );
};

export const Textarea = tw.textarea`
  outline-none
  focus:outline-none
  bg-[#1C232A]
  rounded-[5px]
  border-[1px]
  border-solid
  border-[#4C4C57]
  [padding: 4px 8px]
  h-[80px]
  resize-none
  placeholder:text-[#4C4C57]
  w-full
`;
export default InputBox;
