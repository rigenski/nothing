import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../config/redux/action";
import Illust from "./../../assets/img/illust-login.svg";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidate, setEmailValidate] = useState([false, ""]);
  const [passwordValidate, setPasswordValidate] = useState([false, ""]);
  const history = useHistory();

  const handleChangeText = (e) => {
    if (e.target.id === "email") {
      setEmail(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    }
  };

  const handleLoginSubmit = async () => {
    const res = await props.loginUser({ email, password }).catch((err) => err);

    if (res.code) {
      const { code, message } = res;

      if (code === "auth/invalid-email") {
        setEmailValidate([true, message]);
      } else {
        setPasswordValidate([true, message]);
      }
    } else {
      localStorage.setItem("auth", JSON.stringify(res));
      setEmail("");
      setPassword("");
      setEmailValidate([false, ""]);
      setPasswordValidate([false, ""]);

      history.push("/");
    }
  };

  return (
    <main className="h-screen flex">
      <div className="container my-auto mx-auto py-4 px-4">
        <div className="flex justify-center items-center">
          <div className="w-full sm:w-2/4 md:w-2/5 border-2 border-black bg-gray-200 text-black px-4 py-2 rounded shadow-parent">
            <div className="text-center">
              <div className="flex justify-center">
                <img src={Illust} className="w-60" />
              </div>
              <h1 className="font-parent  text-4xl mt-4 mb-6">nothing</h1>
              <h2 className="font-parent font-semibold text-2xl my-2">Login</h2>
            </div>
            <div className="w-full font-child">
              <div className="email mt-2">
                <label htmlFor="email">Email :</label>
                <input
                  type="text"
                  id="email"
                  className={`w-full block outline-none font-child bg-gray-200 text-black my-1 py-1 border-b-2 ${
                    emailValidate[0] ? "border-red-500" : "border-black"
                  }`}
                  placeholder="user@email.com"
                  value={email}
                  onChange={handleChangeText}
                />
                {emailValidate[0] ? (
                  <span className="text-sm text-red-500">
                    * {emailValidate[1]}
                  </span>
                ) : null}
              </div>
              <div className="password mt-2">
                <label htmlFor="email">Password :</label>
                <input
                  type="password"
                  id="password"
                  className={`w-full block outline-none font-child bg-gray-200 text-black my-1 py-1 border-b-2 border-black ${
                    passwordValidate[0] ? "border-red-500" : "border-black"
                  }`}
                  placeholder="********"
                  value={password}
                  onChange={handleChangeText}
                />
                {passwordValidate[0] ? (
                  <span className="text-sm text-red-500">
                    * {passwordValidate[1]}
                  </span>
                ) : null}
              </div> 
              <div className="submit my-4 flex justify-between items-center">
                <p className="text-xs">
                  New User ?,
                  <span
                    onClick={() => history.push("/register")}
                    className="text-base border-b-2 border-black cursor-pointer"
                  >
                    Register
                  </span>
                </p>
                <button
                  className={`shadow-child font-child px-4 py-2 border-2 border-black rounded ${
                    props.isLoading
                      ? "cursor-not-allowed bg-gray-400"
                      : "cursor-pointer bg-blue-400"
                  }`}
                  onClick={handleLoginSubmit}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const reduxState = (state) => ({
  isLoading: state.isLoading,
});

const reduxDispatch = (dispatch) => ({
  loginUser: (data) => dispatch(loginUser(data)),
});

export default connect(reduxState, reduxDispatch)(Login);
