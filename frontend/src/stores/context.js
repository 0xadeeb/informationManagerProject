import React, { useState, useContext } from "react";

const TokenContext = React.createContext();
const UpdateTokenContext = React.createContext();

export function useToken() {
  return [useContext(TokenContext), useContext(UpdateTokenContext)];
}

export function TokenProvider(props) {
  const [token, setToken] = useState(null);

  return (
    <TokenContext.Provider value={token}>
      <UpdateTokenContext.Provider
        value={(t) => {
          setToken(t);
        }}
      >
        {props.children}
      </UpdateTokenContext.Provider>
    </TokenContext.Provider>
  );
}
