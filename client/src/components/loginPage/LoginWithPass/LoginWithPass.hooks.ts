import toast from "react-hot-toast";

export interface Values {
  email: string;
  password: string;
}
const sleep = (ms: any) => new Promise((r) => setTimeout(r, ms));

export const submitHandler = async (
  values: Values,
  login: any,
  signIn: any,
  setSubmitting: any
) => {
  const LogUser = new Promise(async (res, rej) => {
    try {
      if (values.email == "") rej("please provide your email address.");
      if (values.password == "") rej("please provide your password.");
      await sleep(500);
      const { data } = await login({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
      const accessToken = data?.login?.accessToken;
      res(accessToken);
      await sleep(500);
      signIn({ token: accessToken ? accessToken : null });
    } catch (err) {
      rej("Email or Password is incorrect!");
    }
  });
  toast.promise(LogUser, {
    loading: "Loading",
    success: (data) => `Good To see you again!`,
    error: (err) => {
      setSubmitting(false);
      return err;
    },
  });
};
