import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import jwtDecode from "jwt-decode";
import { useLocation } from "react-router-dom";
import axios from "axios";
import showMessage from "../utils/showMessage";
import LoadingScreen from "components/LoadingScreen";

interface AuthContextType {
  user?: any;
  loading: boolean;
  error?: any;
  login: (data: SignInType) => void;
  signUp: (data: SignUpType) => void;
  logout: () => void;
  recallMyAccount: boolean;
  setRecallMyAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

type SignUpType = {
  name: string;
  gender: string;
  phoneNumber: { code: string; number: string }; // add type
  email: string;
  password: string;
};

type SignInType = {
  email: string;
  password: string;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

// Export the provider as we need to wrap the entire app with it
export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState();
  const [recallMyAccount, setRecallMyAccount] = useState<boolean>(false);
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [myAccountLoading, setMyAccountLoading] = useState<boolean>(false);
  const token = localStorage.getItem("ewentzone_user_token") || "";
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const location = useLocation();

  const isValidToken = (userToken: string) => {
    if (!userToken) {
      return false;
    }
    try {
      jwtDecode(userToken);
    } catch (err) {
      console.log("👾 invalid token format", err);
      return false;
    }

    const token = jwtDecode<any>(userToken);
    const { exp } = token;
    return Math.round(Date.now() / 1000) >= exp ? false : true;
  };

  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname]);

  useEffect(() => {
    setMyAccountLoading(true);
    const userToken = window.localStorage.getItem("ewentzone_user_token");
    if (userToken && isValidToken(userToken)) {
      axios
        .request({
          url: "/auth/my_account",
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((resp) => {
          setUser(resp.data.user);
        })
        .catch((err) => {
          console.error(err);
          setUser(undefined);
          window.localStorage.removeItem("ewentzone_user_token");
        });
    } else {
      setUser(undefined);
      localStorage.removeItem("ewentzone_user_token");
    }
    setMyAccountLoading(false);
  }, [location.pathname, recallMyAccount]);

  function login(data: SignInType) {
    setLoading(true);
    axios
      .request({
        url: "/auth/login",
        method: "POST",
        data,
      })
      .then((resp) => {
        setUser(resp.data.user);
        window.localStorage.setItem("ewentzone_user_token", resp.data.token);
        showMessage("success", resp.data.message);
      })
      .catch((err) => {
        showMessage("error", err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }

  // Sends sign up details to the server. On success we just apply
  // the created user to the state.
  function signUp(data: SignUpType) {
    setLoading(true);
    axios
      .request({
        url: "/auth/register",
        method: "POST",
        data: data,
      })
      .then((resp) => {
        showMessage("success", resp.data.message);
      })
      .catch((err) => {
        showMessage("error", err);
        setError(error);
      })
      .finally(() => setLoading(false));
  }

  function logout() {
    window.localStorage.removeItem("ewentzone_user_token");
    setUser(undefined);
    showMessage("success", "Hesabınızdan başarıyla çıktınız.");
  }

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      signUp,
      logout,
      recallMyAccount,
      setRecallMyAccount,
    }),
    [user, loading, error, recallMyAccount]
  );

  // We only want to render the underlying app after we
  // assert for the presence of a current user.

  return (
    <AuthContext.Provider value={memoedValue}>
      {myAccountLoading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
  return useContext(AuthContext);
}
