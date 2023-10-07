import "./App.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./component/login";
import Form from "./component/form";
import Archive from "./component/archive";
import Signup from "./component/signup";
import Home from "./component/home";
import ViewMalls from "./component/viewMalls";
import FormList from "./component/viewForms";

function App() {
  return (
    <PrimeReactProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login.js" element={<Login />} />
          <Route path="/form.js" element={<Form />} />
          <Route path="/archive.js" element={<Archive />} />
          <Route path="/signup.js" element={<Signup />} />
          <Route path="/viewMalls.js" element={<ViewMalls />} />
          <Route path="/viewForms.js" element={<FormList />} />
        </Routes>
      </Router>
    </PrimeReactProvider>
  );
}

export default App;
