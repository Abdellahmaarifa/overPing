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
}: {
  percentage?: number;
  Image?: string;
  outline?: boolean;
  odd?: boolean;
}) => {
  return (
    <HexagonConatiner>
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
                  stroke: "#99C2E6",
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
            background: Image ? "" : odd ? "#1F70B7" : "#13446F",
            backgroundImage: Image ? `url(${Image})` : "",
          }}
        ></HexagonImage>
      </HexagonShape>
    </HexagonConatiner>
  );
};

export default Hexagon;
