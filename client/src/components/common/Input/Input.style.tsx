import tw, { styled } from "twin.macro";

export interface InputBoxProps {
  type?: string;
  border?: boolean;
  size?: string;
  showPass?: boolean;
  placeholder?: string;
  bgColor?: string;
  Icon?: React.FC;
  theme?: string;
}
const getGlobalStyle = () => {
  return tw`px-[45px] w-[344px] h-[40px] gap-[10px] py-[4px] px-[8px] rounded-[4px] focus:outline-none text-[#B4B5CF] font-rubik text-[16px] font-normal`;
};
const getBorderStyle = (border?: boolean) => {
  return border
    ? tw`border-solid border-[#4C4C57] border-[1px]`
    : tw`border-solid border-[#4C4C57] border-b-[1px]`;
};

const getBackgroundColor = (bgColor?: string) => {
  return bgColor === "dark" ? tw`bg-[#1C232A]` : tw`bg-[transparent]`;
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
const InputBox = styled.input<InputBoxProps>(
  ({ type, border, size, placeholder, bgColor, theme }) => [
    getGlobalStyle(),
    getBorderStyle(border),
    getBackgroundColor(bgColor),
    getPlaceholderStyle(placeholder),
    getCustomTheme(theme),
  ]
);

export const InputBoxIcon: React.FC<{ Icon: React.FC }> = ({ Icon }) => {
  const Component = tw(
    Icon
  )`w-6 h-6 absolute right-[8px] top-1/2 -translate-y-1/2`;
  return <Component />;
};
export default InputBox;
