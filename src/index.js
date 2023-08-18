import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StateProvider } from './Store/Store';
import reducer, { initialstate } from './Reducer/reducer';
import { AuthContextProvider } from './context/AuthContext';
import { HashContextProvider } from './context/HashContext';
import { FormIdProvider } from './context/FormContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

<FormIdProvider>
    <HashContextProvider>
        <AuthContextProvider>
            <StateProvider initialstate={initialstate} reducer={reducer}>
                <App />
            </StateProvider>
        </AuthContextProvider>
    </HashContextProvider>
</FormIdProvider>
    
    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
