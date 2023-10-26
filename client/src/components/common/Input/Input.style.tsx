import tw, { styled } from "twin.macro";

interface IconPass {
  activeIcon: React.FC;
  defaultIcon: React.FC;
  handler: any;
  active: Boolean;
}
export interface InputBoxProps {
  type?: string;
  border?: boolean;
  size?: string;
  showPass?: boolean;
  placeholder?: string;
  bgColor?: string;
  Icon?: IconPass;
  theme?: string;
  state?: "valid" | "invalid";
}
const getGlobalStyle = () => {
  return tw`relative w-[344px] h-[40px] gap-[10px] py-[4px] px-[8px] rounded-[4px] focus:outline-none text-[#B4B5CF] font-rubik text-[16px] font-normal pr-[40px]`;
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
const getStateColor = (state?: string) => {
  if (!state) return tw``;
  return state === "valid" ? tw`border-[#34e4a2]` : tw`border-[#f5425c]`;
};

const InputBox = styled.input<InputBoxProps>(
  ({ type, border, size, placeholder, bgColor, theme, state }) => [
    getGlobalStyle(),
    getBorderStyle(border),
    getBackgroundColor(bgColor),
    getPlaceholderStyle(placeholder),
    getCustomTheme(theme),
    getStateColor(state),
  ]
);

export const InputBoxIcon = ({ Icon }: { Icon: IconPass }) => {
  const Component = tw(
    Icon.active ? Icon.defaultIcon : Icon.activeIcon
  )`w-6 h-6 `;
  return (
    <div
      onClick={() => Icon.handler(!Icon.active)}
      tw="absolute right-[8px] top-1/2 -translate-y-1/2 w-6 h-6 cursor-pointer"
    >
      <Component />
    </div>
  );
};
export default InputBox;
