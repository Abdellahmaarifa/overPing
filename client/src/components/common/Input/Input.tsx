import tw from "twin.macro";
import InputBox, { InputBoxIcon, InputBoxProps } from "./Input.style";

const Input = (props: InputBoxProps) => {
  return (
    <div tw="relative w-fit">
      <InputBox {...props} />

      {props.Icon && <InputBoxIcon Icon={props.Icon} />}
    </div>
  );
};

export default Input;