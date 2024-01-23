import tw from "twin.macro";
import InputBox, { InputBoxIcon, InputBoxProps, Textarea } from "./Input.style";
import { useEffect, useState } from "react";

const Input = (
  props: InputBoxProps & React.ComponentPropsWithoutRef<"input">
) => {
  const [innerWidth, setInerWidth] = useState(0);
  useEffect(() => {
    addEventListener("resize", (event) => {
      setInerWidth(window.innerWidth);
    });
  }, []);
  if (props.$type === "text-area")
    return <Textarea placeholder={props.placeholder} {...props}/>;
  return (
    <div tw="relative w-full flex items-center justify-center">
      <InputBox {...props} />

      {props.$Icon && <InputBoxIcon Icon={props.$Icon} />}
    </div>
  );
};

export default Input;
