import { SERVER_END_POINT } from "constant/constants";
import { UPDATE_STATUS } from "./constantsQueries";

export const registerGlobalEvents = () => {
  window.addEventListener(
    "alive",
    (e) => {
      setTimeout(async () => {
        const userData = await fetch(SERVER_END_POINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-apollo-operation-name": "something",
            // Add any other headers if needed
          },
          body: JSON.stringify({
            query: UPDATE_STATUS,
            variables: {
              currentTime: new Date().toString(),
            },
          }),
          credentials: "include",
        });
        const res = await userData.json();
        if (!res?.data?.updateUserStatus) {
          console.log("failed to update the status to online!");
        }
        console.log("i am live!", res.data.updateUserStatus);
        window.dispatchEvent(new Event("alive"));
      }, 30000);
    },
    false
  );
};
