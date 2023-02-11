import React,{useState} from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { HashRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [alert, setAlert] = useState(null); //alertBox state

  // Alertbox method
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };




  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert = {alert} />
          <div className="container-fluid">
            <Routes>
              <Route exact path="/" element={<Home showAlert = {showAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login showAlert = {showAlert} />} />
              <Route path="/signup" element={<Signup showAlert = {showAlert} />} />
              <Route path="*" element={<Navigate to="/" /> } />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
