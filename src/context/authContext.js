import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { config } from "../config/config";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token") || null)

  const login = async (inputs) => {
    const res = await axios.post(config.base_url+"/auth/login", inputs)
    
    setCurrentUser(res.data)
    setAccessToken(res.data.accessToken)
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem("access_token", accessToken)
  }, [currentUser, accessToken]);

  return (
    <AuthContext.Provider value={{ currentUser, login, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
