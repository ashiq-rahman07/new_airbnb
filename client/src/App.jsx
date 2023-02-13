import axios from "axios";
import { Route, Routes} from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import { Layaout } from "./Layaout/Layaout";
// import { Header } from "./components/Header";

import { IndexPage } from "./pages/IndexPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true;


function App() {

 return (
  <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layaout/>}>
        <Route index element={<IndexPage/>} />
        <Route path="/login"  element={<LoginPage/>} />
        <Route path="/register"  element={<RegisterPage/>} />

      </Route>
      
    </Routes>
  </UserContextProvider>
    
)
}

export default App;
