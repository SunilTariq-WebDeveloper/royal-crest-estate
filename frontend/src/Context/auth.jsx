import { useContext, useState, useEffect, createContext } from "react";

const userContext = createContext();

const AuthContext = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const data = localStorage.getItem("auth");
    return data
    ? JSON.parse(data)
    : { user: null, token: "", refreshtoken: "" };
  });
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      setAuth(JSON.parse(data));
    }
  }, []);

  return (
    <userContext.Provider value={[auth, setAuth]}>
      {children}
    </userContext.Provider>
  );
};

export default AuthContext;
export const useAuth = () => useContext(userContext);
