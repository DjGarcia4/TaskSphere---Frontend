import { useState, useEffect, createContext } from "react";
// import { useNavigate } from "react-router-dom";
import clientAxios from "../config/clientAxios";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [charging, setCharging] = useState(true);

  // const navigate = useNavigate();

  useEffect(() => {
    const authUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setCharging(false);
          return;
        }
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clientAxios("/users/profile", config);
        setAuth(data);

        // navigate("/projects");
      } catch (error) {
        setAuth({});
      } finally {
        setCharging(false);
      }
    };
    authUser();
  }, []);

  const logOut = () => {
    setAuth({});
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, charging, setCharging, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
