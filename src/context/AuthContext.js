import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: "",
  email: "",
  photoUrl: ""
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    
    case "LOGIN_SUCCESS":
      return {
        user:action.user,
        email: action.email,
        photoUrl: action.photo,
      };
    case "LOGIN_OUT":
      return {
        user:null,
        email:null,
        photoUrl:null
      };
    
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        email: state.email,
        photoUrl: state.photoUrl,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};