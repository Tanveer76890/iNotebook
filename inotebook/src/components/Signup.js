import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({showAlert}) => {
     const host = "http://localhost:5000";
     const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword:"" });
     let navigate = useNavigate();
   
     const handleSubmit = async (e) => {
       e.preventDefault();
       // TODO api call
       const response = await fetch(`${host}/api/auth/createUser`, {
         method: "POST",
         headers: {
           "content-type": "application/json",
         },
         body: JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password }),
       });
       const json = await response.json();
       console.log(json);
       if (json.success) {
        // save the auth token and redirect the home page 
        localStorage.setItem('token', json.authtoken);
         navigate("/");
         showAlert("Account created successfully ", "success");
       }else{
        showAlert("invalid details ", "danger");
       }
   
     };
   
     //   onchange event method
     const inputData = (e) => {
       setCredentials({ ...credentials, [e.target.name]: e.target.value });
     };
   



  return (
    <>
    <div className="container my-3 w-50  mx-auto">
    <h2>Create an account to use iNotebook</h2>
    <form className="my-4" onSubmit={handleSubmit}>

    <div className="mb-3">
    <label htmlFor="name" className="form-label">
      Enter userName
    </label>
    <input
      type="text"
      name="name"
      onChange={inputData}
      value={credentials.name}
      className="form-control"
      id="name"
    />
     
  </div>

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

      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">
          confirm Password
        </label>
        <input
          type="password"
          name="cpassword"
          onChange={inputData}
          value={credentials.cpassword}
          className="form-control"
          id="cpassword"
          minLength={5}
          required
        />
      </div>


      <button type="submit" className="btn btn-info">
        register
      </button>
    </form>
  </div>
    </>
  )
}

export default Signup;