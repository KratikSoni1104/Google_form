import { createContext, useContext, useReducer } from "react";
import reducer, { initialstate } from "../Reducer/reducer";


export const StateContext = createContext()

export const StateProvider = ({reducer , initialstate , children}) => {

    return (<StateContext.Provider
        value={useReducer(reducer,initialstate)}
    >
        {children}
    </StateContext.Provider>)

}

export const useStateValue = () => useContext(StateContext)