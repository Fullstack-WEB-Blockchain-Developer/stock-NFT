import { createContext, useEffect, useReducer } from "react";
//next
import { useRouter } from "next/router";
//redux
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import { store } from "../redux/store";
//axios
import axios from "axios";
//web3
import { useWeb3React } from "@web3-react/core";
import { injected, coinbaseWallet, walletConnect } from "../connectors";

const initialState = {
  isAuthorized: false,
  account: null,
  error: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthorized, account, error } = action.payload;
    return {
      ...state,
      isAuthorized,
      account,
      error,
    };
  },
  LOGIN: (state, action) => {
    const { account } = action.payload;

    return {
      ...state,
      isAuthorized: true,
      account,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthorized: false,
    account: null,
  }),
  CLEAR_ERROR: (state) => ({
    ...state,
    error: null,
  }),
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

const verifyUser = async (accessToken) => {
  const result = await axios.get(`${process.env.BACKEND_URL}/auth/verifyUser`, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
  return result;
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const pagesForUnauthorized = useSelector((state) => state.administration.pagesForUnauthorized);
  const router = useRouter();
  const { deactivate, activate } = useWeb3React();

  useEffect(() => {
    const initialize = async () => {
      console.log("---initialization");
      try {
        const accessToken = localStorage.getItem("accessToken");
        const account = localStorage.getItem("account");
        const isValid = await verifyUser(accessToken);
        const walletConnected = localStorage.getItem("walletConnected");

        if (accessToken && isValid?.data?.token) {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthorized: true,
              account,
            },
          });

          switch (walletConnected) {
            case "metamask":
              activate(injected);
              break;

            case "https://ropsten-infura.wallet.coinbase.com":
              activate(coinbaseWallet);
              break;

            default:
              break;
          }
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthorized: false,
              account: null,
            },
          });
          console.log("push");
          router.push("/connect-wallet");
        }
      } catch (err) {
        if (!pagesForUnauthorized.includes(router.pathname)) {
          router.replace("/connect-wallet");
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthorized: false,
              account: null,
              error: { ...err.response?.data },
            },
          });
          dispatch({ type: "CLEAR_ERROR" });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthorized: false,
              account: null,
            },
          });
        }
      }
    };

    initialize();
  }, [router.pathname, initialState.isAuthorized]);

  const login = async (signature, account) => {
    try {
      const tokenRes = await axios.post(`${process.env.BACKEND_URL}/auth`, {
        publicAddress: account,
        signature,
      });

      localStorage.setItem("accessToken", tokenRes.data.token);
      localStorage.setItem("account", account);

      dispatch({
        type: "LOGIN",
        payload: {
          account,
        },
      });
      router.pathname === "/connect-wallet" && router.push("/");
    } catch (e) {
      dispatch({
        type: "INITIALIZE",
        payload: {
          isAuthorized: false,
          account: null,
          error: { ...e.response?.data },
        },
      });
      dispatch({ type: "CLEAR_ERROR" });
    }
  };

  const logout = async () => {
    deactivate();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("account");
    dispatch({ type: "LOGOUT" });
    if (!pagesForUnauthorized.includes(router.pathname)) {
      router.replace("/connect-wallet");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
