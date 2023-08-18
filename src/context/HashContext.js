import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
  userId:"",
  formId:""
};

export const HashContext = createContext(INITIAL_STATE);

const HashReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
        userId:"",
        formId:""
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
        userId:action.id,
        formId:""
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
        userId:"",
        formId:""
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
        userId:"",
        formId:""
      };

    case "REGISTER_START":
        return { 
          user: null,
          loading: true,
          error: null,
          userId:"",
          formId:""
        };
  
    case "REGISTER_SUCCESS":
        return {
        user: action.payload,
        loading: false,
        error: null,
        userId:"",
        formId:""
      };
  
    case "REGISTER_FAILURE":
        return {
        user: null,
        loading: false,
        error: action.payload,
        userId:"",
        formId:""
      };
      
    case "CLEAR_ERROR":
      return {
        user: null,
        loading: false,
        error: null,
        userId:"",
        formId:""
      };
    case "SET_FORM_ID":
      return {
        ...state,
        formId: action.payload
      }
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
        formId:state.formId,
        dispatch,
      }}
    >
      {children}
    </HashContext.Provider>
  );
};