import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
  userId:""
};

export const HashContext = createContext(INITIAL_STATE);

const HashReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
        userId:""
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
        userId:action.id
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
        userId:""
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
        userId:""
      };

    case "REGISTER_START":
        return { 
          user: null,
          loading: true,
          error: null,
          userId:""
        };
  
    case "REGISTER_SUCCESS":
        return {
        user: action.payload,
        loading: false,
        error: null,
        userId:""
      };
  
    case "REGISTER_FAILURE":
        return {
        user: null,
        loading: false,
        error: action.payload,
        userId:""
      };
      
    case "CLEAR_ERROR":
      return {
        user: null,
        loading: false,
        error: null,
        userId:""
      };
    default:
      return state;
  }
};

export const HashContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(HashReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <HashContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        userId:state.userId,
        dispatch,
      }}
    >
      {children}
    </HashContext.Provider>
  );
};