import tw from "twin.macro";
import InputBox, { InputBoxIcon, InputBoxProps } from "./Input.style";

const Input = (
  props: InputBoxProps & React.ComponentPropsWithoutRef<"input">
) => {
  return (
    <div tw="relative w-full">
      <InputBox {...props} />

      {props.$Icon && <InputBoxIcon Icon={props.$Icon} />}
    </div>
  );
};

export default Input;
