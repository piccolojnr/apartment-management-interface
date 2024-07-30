import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "@/types/user";

type ContextProps = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  error: any;
};

export const UserContext = createContext<ContextProps>({
  user: null,
  setUser: () => {},
  loading: true,
  error: null,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        setUser(JSON.parse(user));
      } else {
        setUser(null);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
