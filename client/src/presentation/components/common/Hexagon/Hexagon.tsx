import { CircularProgressbar } from "react-circular-progressbar";
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
  odd,
  outline,
  width,
  height,
  stroke,
}: {
  percentage: number;
  Image?: string;
  outline?: boolean;
  odd?: boolean;
  width?: number;
  height?: number;
  stroke?: string;
}) => {
  return (
    <HexagonConatiner
      style={
        width && height
          ? {
              width: `${width.toString()}px`,
              height: `${height.toString()}px`,
            }
          : undefined
      }
    >
      {outline && <HexagonMask />}
      <HexagonShape>
        <HexagonBackground
          style={{
            background: outline
              ? ""
              : !odd
              ? "linear-gradient(91deg, #4E95D4 44.29%, rgba(173, 207, 238, 0.80) 110.12%)"
              : "linear-gradient(91deg, rgba(173, 207, 238, 0.80) 44.29%, #4E95D4 110.12%)",
          }}
        >
          {outline && (
            <CircularProgressbar
              value={percentage}
              strokeWidth={50}
              background={true}
              styles={{
                path: {
                  strokeLinecap: "round",
                  stroke: stroke || "#99C2E6",
                  transform: "rotate(0.09turn)",
                  transformOrigin: "center center",
                },
                background: { fill: "transparent" },
                trail: { stroke: "transparent" },
              }}
            />
          )}
        </HexagonBackground>

        <HexagonImage
          style={{
            background:
              outline && Image
                ? `center/cover url(${Image})`
                : Image
                ? `linear-gradient(rgba(79, 149, 212, 0.36), rgba(79, 149, 212, 0.36)), center/cover url(${Image})`
                : odd
                ? "#1F70B7"
                : "#13446F",
          }}
        ></HexagonImage>
      </HexagonShape>
    </HexagonConatiner>
  );
};

export default Hexagon;
