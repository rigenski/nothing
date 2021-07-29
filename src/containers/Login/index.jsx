import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../config/redux/action";
import IllustrationLogin from "./../../assets/img/illustration-login.png";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidate, setEmailValidate] = useState([false, ""]);
  const [passwordValidate, setPasswordValidate] = useState([false, ""]);
  const [loading, isLoading] = useState(false);
  const history = useHistory();

  const handleChangeText = (e) => {
    if (e.target.id === "email") {
      setEmail(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    }
  };

  const handleLoginSubmit = async () => {
    isLoading(true);
    const { loginUser } = props;
    const res = await loginUser({ email, password }).catch((err) => err);

    if (res.code) {
      const { code, message } = res;

      if (code === "auth/invalid-email") {
        setEmailValidate([true, message]);
      } else {
        setPasswordValidate([true, message]);
      }

      isLoading(false);
    } else {
      localStorage.setItem("user", JSON.stringify(res));
      setEmail("");
      setPassword("");
      setEmailValidate([false, ""]);
      setPasswordValidate([false, ""]);

      isLoading(false);
      history.push("/");
    }
  };

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  return (
    <main className="font-app text-gray-800">
      <div className="container mx-auto my-auto p-4">
        <div className="lg:flex lg:justify-around lg:items-center lg:my-12 ">
          <div className="flex justify-center">
            <img
              src={IllustrationLogin}
              alt="Illustration Login"
              className="h-72 mt-9 lg:h-96"
            />
          </div>
          <div className="flex justify-center">
            <div className="max-w-md mt-6 px-4">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold mb-9">Login</h1>
              </div>
              <input
                type="text"
                id="email"
                className={`w-full text-md font-semibold bg-gray-200 rounded-lg px-6 py-2.5 ${
                  emailValidate[0] ? "border-2 border-red-500" : "border-none"
                }`}
                placeholder="Email"
                value={email}
                onChange={(e) => handleChangeText(e)}
              />
              {emailValidate[0] ? (
                <span className="text-xs text-red-500">
                  * {emailValidate[1]}
                </span>
              ) : null}
              <input
                type="email"
                id="password"
                className={`w-full text-md font-semibold bg-gray-200 rounded-lg px-6 py-2.5 mt-3 ${
                  passwordValidate[0]
                    ? "border-2 border-red-500"
                    : "border-none"
                }`}
                placeholder="Password"
                alue={password}
                onChange={(e) => handleChangeText(e)}
              />
              {passwordValidate[0] ? (
                <span className="text-xs text-red-500">
                  * {passwordValidate[1]}
                </span>
              ) : null}
              <div className="flex justify-between items-center mt-6">
                <h4 className="font-medium">
                  New User ...?{" "}
                  <span
                    onClick={() => history.push("/register")}
                    className="font-extrabold cursor-pointer text-blue-500 border-b-2 border-blue-400"
                  >
                    Register
                  </span>
                </h4>
                <button
                  className={`text-md text-white font-bold rounded-lg px-6 py-2.5 ${
                    loading
                      ? "cursor-not-allowed bg-gray-400"
                      : "cursor-pointer bg-blue-500"
                  }`}
                  onClick={() => handleLoginSubmit()}
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

const reduxDispatch = (dispatch) => ({
  loginUser: (data) => dispatch(loginUser(data)),
});

export default connect(null, reduxDispatch)(Login);
