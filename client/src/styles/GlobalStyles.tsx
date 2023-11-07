import { createGlobalStyle } from "styled-components";
import tw, { theme, GlobalStyles as BaseStyles } from "twin.macro";

const CustomStyles = createGlobalStyle({
  html: {
    ...tw``,
  },
  body: {
    WebkitTapHighlightColor: theme`colors.purple.500`,
    ...tw`antialiased min-w-[100vw] min-h-[100vh] bg-[#0F1A24] text-white`,
  },
});

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);

export default GlobalStyles;
