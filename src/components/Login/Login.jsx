import bg from "../../assets/bg-login.svg";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import "./Login.scss";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();
  const onClickRegister = () => {
    //return <Redirect to="register" />;
    return navigate("register");
  };
  const onSubmitSuccuss = (jwtToken) => {
    console.log("xutaa", jwtToken);
    if (Cookies.get("user_roles") === "ROLE_ADMIN") {
      console.log("user_roles");
      return navigate("/admin");
    }

    return navigate("/");
  };

  const onSubmitFailure = () => {
    setShowSubmitError(true);
    setErrorMsg("Username or Password is Invalid");
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const userDetails = { username, password };
    const apiUrl =
      "https://bookhubpostgress-production.up.railway.app/api/auth/signin";
    const options = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer`,
      }),
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(apiUrl, options);

    const data = await response.json();
    console.log("data login", data);
    if (response.ok === true) {
      Cookies.set("jwt_token", data.accessToken, { expires: 30, path: "/" });
      Cookies.set("user_id", data.id, { expires: 30, path: "/" });
      Cookies.set("user_roles", data.roles, { expires: 30, path: "/" });
      localStorage.setItem("data_avatar", data.avatar);
      onSubmitSuccuss(data.accessToken);
    } else {
      onSubmitFailure(data.error_msg);
    }
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    if (Cookies.get("user_roles") === "ROLE_ADMIN") {
      console.log("user_roles");
      return navigate("/");
    }

    return navigate("/");
  }

  return (
    <div className="login-page">
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="login-form-container"
      >
        <div className="left-content-login">
          <img
            src="https://res.cloudinary.com/dwtsapuyn/image/upload/v1645077666/book-hub-logo_dy4szt.png"
            alt="website logo"
            className="login-website-logo-desktop-image"
          />
          <div className="bookhub-des-login">
            BookHub helps people share books, join discussions, discover new
            books, and connect with readers.
          </div>
        </div>

        <div className="form-main-container">
          <form
            className="form-container"
            onSubmit={(event) => onSubmitForm(event)}
          >
            <div className="input-container">
              <>
                <label className="input-label" htmlFor="username">
                  Username
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="username"
                  className="input-field"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => onChangeUsername(e)}
                />
              </>
              {showSubmitError && <p className="error-message">{errorMsg}</p>}
            </div>
            <div className="input-container">
              <>
                <label className="input-label" htmlFor="password">
                  Password<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  className="input-field"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => onChangePassword(e)}
                />
              </>
              {showSubmitError && <p className="error-message">{errorMsg}</p>}
            </div>
            <button type="submit" className="login-button">
              Login
            </button>

            {showSubmitError && <p className="error-message">{errorMsg}</p>}
            <a href="#" className="forgot-pw">
              Forgot password
            </a>
            <div className="space-login"></div>
            <button
              className="register-button"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <div className="footer-login">
        <div className="tran-login">
          <div>English (UK)</div>
          <div>Tiếng Việt</div>
        </div>
        <div>Copyright @ 2023 by F1</div>
      </div>
    </div>
  );
};
export default Login;
