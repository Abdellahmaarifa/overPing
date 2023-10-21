import { useMutation } from "@apollo/client";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import LOGIN from "queries/Login.query";
import { useUserContext } from "context/user.context";

const Login = () => {
  const { signIn, user } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();

  const [login, { error, loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const {
        login: { token, user },
      } = data;
      console.log(token, user);
      signIn(user, token);
      navigate("/", { replace: true });
    },
  });

  const handleLogin = (email: string, password: string) => {
    login({ variables: { email, password } });
  };
  console.log("this is what in user:", user);
  if (loading) return <h1>Loading....</h1>;
  return user ? (
    <Navigate to="/" />
  ) : (
    <>
      <h1>Login page.</h1>
      <button
        onClick={() => {
          handleLogin("test@gmail.com", "test");
          console.log("error and loading : ", error?.message);
          location.state?.from ? navigate(location.state.from) : null;
        }}
      >
        click
      </button>
    </>
  );
};

export default Login;
