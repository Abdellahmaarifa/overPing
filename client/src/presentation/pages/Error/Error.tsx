import LostImg from "assets/common/lost.png";
import { ErrorContainer } from "./Error.style";
import ErrorModel from "components/common/ErrorModel/ErrorModel";
function Error() {
  return (
    <ErrorContainer>
      <ErrorModel
        code={404}
        name="Not Found"
        description="the page you are looking for is not found."
        image={LostImg}
      />
    </ErrorContainer>
  );
}

export default Error;
