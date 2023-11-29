import { createContext, useContext } from "react";

const HomeContext = createContext({});

export const HomeProvider = ({ children }: { children: React.ReactNode }) => {
  return <HomeContext.Provider value={{}}>{children}</HomeContext.Provider>;
};

export const useHomeContext = () => useContext(HomeContext);
