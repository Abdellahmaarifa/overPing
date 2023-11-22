import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type Props = {
  children: React.ReactNode;
};
type LContext = {
  showRegister: boolean;
  setShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
  registerStep: number;
  setRegisterStep: (direction: string) => void;
};

const LoginContext = createContext<LContext>({
  showRegister: false,
  setShowRegister: () => {},
  registerStep: 0,
  setRegisterStep: () => {},
});

const LoginContextProvider = ({ children }: Props): JSX.Element => {
  const [showRegister, setShowRegister] = useState(false);
  const [registerStep, setRegisterStep] = useState(0);
  /*const contextValue = useMemo(
    () => ({ showRegister, setShowRegister }),
    [showRegister, setShowRegister]
  );
*/
  const contextValue = {
    setShowRegister,
    showRegister,
    registerStep,
    setRegisterStep: (direction: string) => {
      if (direction === "reset") {
        setRegisterStep(0);
        return;
      }
      if (registerStep < 3 && direction === "next")
        setRegisterStep(registerStep + 1);
      if (direction === "prev") {
        if (registerStep > 0) setRegisterStep(registerStep - 1);
        else if (registerStep == 0) setShowRegister(false);
      }
    },
  };
  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error("useLoginContext was used outside of its provider.");
  }
  return context;
};

export default LoginContextProvider;
