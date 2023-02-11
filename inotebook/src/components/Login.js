import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = ({showAlert}) => {
  const host = "http://localhost:5000";
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO api call
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email:credentials.email, password:credentials.password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
     // save the auth token and redirect the home page 
     localStorage.setItem('token', json.authtoken);
      showAlert("logged in successfully ", "success");
      navigate("/");
    }else{
     showAlert("invalid credentials", "danger");
    }

  };

  //   onchange event method
  const inputData = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-login">
    <>
      <div className="container w-50  mx-auto mt-2">
      <h2>Login to continue to iNotebook</h2>
        <form className="my-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Enter valid Email
            </label>
            <input
              type="email"
              name="email"
              onChange={inputData}
              value={credentials.email}
              className="form-control"
              id="email"
              required
            />
            <div className="form-text" id="emailhelp">We'll naver share your email with anyone else
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={inputData}
              value={credentials.password}
              className="form-control"
              id="password"
              minLength={5}
              required
            />
          </div>

          <button type="submit" className="btn btn-info" >
            login
          </button>
        </form>
      </div>
     
    </>
    </div>
  );
};

export default Login;
