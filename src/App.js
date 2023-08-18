import Form from "./components/form/Form"
import MainPage from './components/mainpage/MainPage';
import { BrowserRouter as Router , Route ,Routes } from 'react-router-dom';
import UserForm from "./components/userForm/UserForm";
import LoginPage from "./components/login/LoginPage";

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/form/:id" element={<Form />} />
        <Route path="/response" element={<UserForm />}/>
        <Route path="/home" element={<MainPage />} />
        <Route path="/forms/form_link/:formId" element={<UserForm />}/>
      </Routes>
    </Router>
      
    </div>
  );
}

export default App;
