import InputBox, { InputBoxIcon, InputBoxProps } from "./Input.style";
import tw from "twin.macro";
const Input = (props: InputBoxProps) => {
  return (
    <div tw="relative w-fit">
      <InputBox {...props} />
      {props.Icon && <InputBoxIcon Icon={props.Icon} />}
    </div>
  );
};

export default Input;
