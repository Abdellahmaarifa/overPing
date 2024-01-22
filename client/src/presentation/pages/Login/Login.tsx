import LoginAuth from "components/loginPage/LoginAuth/LoginAuth";
import LoginForm from "components/loginPage/LoginForm/LoginForm";
import LoginSide from "components/loginPage/LoginSide/LoginSide";
import SignUp from "components/loginPage/SignUp/SignUp";
import LoginContextProvider, { useLoginContext } from "context/login.context";
import { useUserContext } from "context/user.context";
import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "gql/index";
import { FormContainer, PageContainer } from "./Login.style";
const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [regiser] = useRegisterMutation();
  const [login] = useLoginMutation();
  const { signIn, signOut, user } = useUserContext();
  const { showRegister } = useLoginContext();
  let [searchParams, setSearchParams] = useSearchParams();
  console.log("params:", searchParams);
  /*regiser({
    variables: {
      email: "hello_world!",
      password: "test",
    },
  });*/
  async function loginUser() {
    const res = await login({
      variables: {
        email: "hello_world!",
        password: "test",
      },
    });
    const accessToken = (res.data as any)?.login?.accessToken;
    signIn({ token: accessToken ? accessToken : null });
    console.log(res);
  }
  let display = false;
  if (searchParams.get("step") == "verification") display = true;
  const history = location?.state?.from?.pathname;
  return user ? (
    <Navigate to={history || "/"} />
  ) : (
    <PageContainer>
      <FormContainer>
        <LoginForm />
        <LoginSide />
        <div tw="absolute bottom-0 w-full max-h-[30vh] h-[390px] bg-login-gradient-mobile block lg:hidden z-[1] sm:z-[0]"></div>
        <div tw="bg-[#0a0b0c] w-full h-full absolute right-0 top-0 opacity-[.5]"></div>
        {display && <LoginAuth />}
        {showRegister && <SignUp />}
      </FormContainer>
    </PageContainer>
  );
};

export default Login;
