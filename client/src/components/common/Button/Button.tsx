import ButtonLink, { IconContainer, ButtonLinkProps } from "./Button.style";

const Button = ({
  size = "sm",
  transparent = false,
  border = false,
  text,
  Icon,
  disabled = false,
  theme = "white",
  type,
}: ButtonLinkProps) => {
  return (
    <ButtonLink
      size={size}
      transparent={transparent}
      theme={theme}
      border={border}
      icon={Icon ? true : false}
      text={text}
      disabled={disabled}
      type={type}
    >
      {Icon && <IconContainer Icon={Icon} />}
      {text}
    </ButtonLink>
  );
};
export default Button;
