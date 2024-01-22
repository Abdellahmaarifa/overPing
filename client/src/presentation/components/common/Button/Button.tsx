import ButtonLink, { IconContainer, ButtonLinkProps } from "./Button.style";

const Button = ({
  $size = "sm",
  $transparent = false,
  $border = false,
  $text,
  $Icon,
  $disabled = false,
  $theme = "white",
  type,
  onClick,
}: ButtonLinkProps) => {
  return (
    <ButtonLink
      $size={$size}
      $transparent={$transparent}
      $theme={$theme}
      $border={$border}
      $icon={$Icon ? true : false}
      $text={$text}
      $disabled={$disabled}
      type={type}
      onClick={onClick}
    >
      {$Icon && <IconContainer Icon={$Icon} />}
      {$text}
    </ButtonLink>
  );
};
export default Button;
