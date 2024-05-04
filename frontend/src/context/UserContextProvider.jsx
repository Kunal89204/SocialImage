import React, { useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
