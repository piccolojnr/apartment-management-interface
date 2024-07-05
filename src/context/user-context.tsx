import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "@/types/user";
import useSWR, { KeyedMutator } from "swr";
import { BASE_API_URL } from "@lib/constants";

type ContextProps = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  error: any;
  loggedIn: boolean;
};

export const UserContext = createContext<ContextProps>({
  user: null,
  setUser: () => {},
  loading: true,
  error: null,
  loggedIn: true,
});

const fetcher = (url: string) =>
  fetch(url, {
    credentials: "include",
  }).then((res) => res.json());

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState(true);
  // const { data, error, isLoading, mutate } = useSWR(
  //   BASE_API_URL + `/user`,
  //   fetcher
  // );

  // useEffect(() => {
  //   setUser(!error && !isLoading && data.id ? data : null);
  // }, [data, error, isLoading]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading: false,
        error: null,
        loggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
