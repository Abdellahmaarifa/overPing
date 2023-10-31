import Button from "components/common/Button/Button";
import { useUserContext } from "context/user.context";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useHomeQuery, useLogoutMutation } from "../../graphql";
const Home = () => {
  const { data, loading, error } = useHomeQuery();
  const [cookie, setCookie, removeCookie] = useCookies();
  const { signOut } = useUserContext();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  if (loading) return <h2>loading..</h2>;
  return (
    <>
      <h1>
        Home Page <span>{data?.home}</span>.
      </h1>
      <Button
        text="Logout"
        size="xl"
        onClick={async () => {
          await logout();
          signOut();
          navigate("/login");
          console.log("cookie!!", cookie);
          removeCookie("yamy");
        }}
      />
    </>
  );
};

export default Home;
