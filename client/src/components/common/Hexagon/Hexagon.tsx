import { CircularProgressbar } from "react-circular-progressbar";
import tw from "twin.macro";
import {
  HexagonBackground,
  HexagonConatiner,
  HexagonImage,
  HexagonMask,
  HexagonShape,
} from "./Hexagon.style";

const Hexagon = ({
  percentage,
  Image,
}: {
  percentage: number;
  Image: string;
}) => {
  return (
    <HexagonConatiner>
      <HexagonMask />
      <HexagonShape>
        <HexagonBackground>
          <CircularProgressbar
            value={percentage}
            strokeWidth={50}
            background={true}
            styles={{
              path: {
                strokeLinecap: "round",
                stroke: "#99C2E6",
                transform: "rotate(0.09turn)",
                transformOrigin: "center center",
              },
              background: { fill: "transparent" },
              trail: { stroke: "transparent" },
            }}
          />
        </HexagonBackground>

        <HexagonImage
          style={{
            backgroundImage: `url(${Image})`,
          }}
        ></HexagonImage>
      </HexagonShape>
    </HexagonConatiner>
  );
};

export default Hexagon;
