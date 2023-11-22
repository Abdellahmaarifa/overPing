import React from "react";
import {
  SepratorLine,
  SepratorContainer,
  SepratorText,
} from "./Seprator.style";
const Seprator = ({ text }: { text?: string }) => {
  return (
    <SepratorContainer>
      <SepratorLine />
      <SepratorText>{text}</SepratorText>
      <SepratorLine />
    </SepratorContainer>
  );
};

export default Seprator;
