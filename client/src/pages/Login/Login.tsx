import { Navigate, useLocation, useNavigate } from "react-router-dom";

const Login = ({
  logIn,
  setLogIn,
}: {
  logIn: Boolean;
  setLogIn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  return logIn ? (
    <Navigate to="/" />
  ) : (
    <>
      <h1>Login page.</h1>
      <button
        onClick={() => {
          setLogIn(true);
          location.state?.from ? navigate(location.state.from) : null;
        }}
      >
        click
      </button>
    </>
  );
};

export default Login;
