import { createContext, useContext, useState } from "react";

type Props = {
  children: React.ReactNode;
  value?: LayoutCtxType;
};

type userMenuStateType = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
];
type mobileMenuStateType = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
];
type TabStateType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];
type LayoutCtxType = {
  userMenuState: userMenuStateType;
  mobileMenuState: mobileMenuStateType;
  matchTabState: TabStateType;
  friendsMatchTabState: TabStateType;
};

export class LayoutContextValue implements LayoutCtxType {
  userMenuState: userMenuStateType;
  mobileMenuState: mobileMenuStateType;
  matchTabState: TabStateType;
  friendsMatchTabState: TabStateType;
  constructor() {
    this.userMenuState = useState(false);
    this.mobileMenuState = useState(false);
    this.matchTabState = useState(true);
    this.friendsMatchTabState = useState(true);
  }
}

const LayoutContext = createContext<LayoutCtxType>({
  userMenuState: [false, () => {}],
  mobileMenuState: [false, () => {}],
  matchTabState: [true, () => {}],
  friendsMatchTabState: [true, () => {}],
});

const useLayoutContextProvider =
  () =>
  ({ children }: Props): JSX.Element => {
    return (
      <LayoutContext.Provider value={new LayoutContextValue()}>
        {children}
      </LayoutContext.Provider>
    );
  };

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayoutContext was used outside of its provider.");
  }
  return context;
};

export default useLayoutContextProvider;
