import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./App.css";

function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isLoginAttemptCount, setIsloginAttemptCount] = useState(0);
  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1",
    },
    {
      username: "user2",
      password: "pass2",
    },
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };
  const handleLogout = () => {
    window.location.reload();
    console.log("logout");
  };
  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
        setIsloginAttemptCount((attempt) => attempt + 1);
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            type={isPasswordShown ? "text" : "password"}
            name="pass"
            required
          />
          <span
            className="password-icon-container"
            onClick={() => setIsPasswordShown(!isPasswordShown)}
          >
            {isPasswordShown ? (
              <VisibilityIcon className="password-icon" />
            ) : (
              <VisibilityOffIcon className="password-icon" />
            )}
          </span>
          {renderErrorMessage("pass")}
          {isLoginAttemptCount}
        </div>
        <div className="button-container">
          {isLoginAttemptCount === 3 ? (
            <input type="submit" disabled />
          ) : (
            <input type="submit" />
          )}
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? (
          <div>
            User is successfully logged in
            <button className="button-container" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          renderForm
        )}
      </div>
    </div>
  );
}

export default App;
