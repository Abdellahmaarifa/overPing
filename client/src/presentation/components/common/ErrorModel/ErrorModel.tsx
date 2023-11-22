import GithubICon from "assets/landingPage/github.svg?react";
import {
  ErrorCode,
  ErrorDescription,
  ErrorHeader,
  ErrorImg,
  ErrorModelContainer,
  ErrorName,
  ErrorSep,
} from "./ErrorModel.style";

const ErrorModel = ({
  code,
  name,
  description,
  image,
}: {
  code: number;
  name: string;
  description: string;
  image: string;
}) => {
  return (
    <ErrorModelContainer>
      <ErrorHeader>
        <ErrorCode>{code}</ErrorCode>
        <ErrorSep>{"|"}</ErrorSep>
        <ErrorName>{name}</ErrorName>
      </ErrorHeader>
      <ErrorImg src={image} />
      <ErrorDescription>
        <p>{description}</p>
        <a href="https://github.com/Abdellahmaarifa/overPing" target="_blan">
          <GithubICon />
        </a>
      </ErrorDescription>
    </ErrorModelContainer>
  );
};

export default ErrorModel;
