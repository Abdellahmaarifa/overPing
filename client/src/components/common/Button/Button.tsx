import ButtonLink, { IconContainer, ButtonLinkProps } from "./Button.style";

const Button = ({
  size = "sm",
  transparent = false,
  border = false,
  text,
  Icon,
  disable = false,
  theme = "white",
}: ButtonLinkProps) => {
  return (
    <ButtonLink
      size={size}
      transparent={transparent}
      theme={theme}
      border={border}
      icon={Icon ? true : false}
      text={text}
      disable={disable}
    >
      {Icon && <IconContainer Icon={Icon} />}
      {text}
    </ButtonLink>
  );
};
export default Button;
