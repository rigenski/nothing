import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../config/redux/action";
import IllustRegister from "./../../assets/img/illust-register.svg";

function Register(props) {
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

  const handleRegisterSubmit = async () => {
    isLoading(true);

    const { registerUser } = props;
    const res = await registerUser({ email, password }).catch((err) => err);

    if (res.code) {
      const { code, message } = res;

      if (code === "auth/invalid-email") {
        setEmailValidate([true, message]);
      } else {
        setPasswordValidate([true, message]);
      }

      isLoading(false);
    } else {
      setEmail("");
      setPassword("");
      setEmailValidate([false, ""]);
      setPasswordValidate([false, ""]);

      isLoading(false);
      history.push("/login");
    }
  };

  return (
    <main>
      <div className="container mx-auto my-auto p-4">
        <div className="lg:flex lg:justify-around lg:items-center lg:mt-12">
          <div className="flex lg:w-6/12 justify-center mt-4 mb-6">
            <img
              src={IllustRegister}
              className="w-96 px-8 lg:w-full lg:px-16"
              alt="illustration register"
            />
          </div>
          <div className="flex lg:w-6/12 justify-center">
            <div className="w-full md:max-w-md md:w-full shadow-xl rounded-xl px-4 pt-6 pb-16 lg:px-8 lg:pt-12 lg:pb-18">
              <h2 className="text-2xl font-bold mb-6">Register !</h2>
              <div className="mb-2">
                <label htmlFor="email">Email :</label>
                <input
                  type="text"
                  id="email"
                  className={`block w-full px-4 py-2 bg-gray-200 mt-2 rounded-lg ${
                    emailValidate[0] ? "border-2 border-red-500" : "border-none"
                  }`}
                  placeholder="user@email.com"
                  value={email}
                  onChange={(e) => handleChangeText(e)}
                />
                {emailValidate[0] ? (
                  <span className="text-xs mt-1 text-red-500">
                    * {emailValidate[1]}
                  </span>
                ) : null}
              </div>
              <div className="mb-2">
                <label htmlFor="email">Password :</label>
                <input
                  type="password"
                  id="password"
                  className={`block w-full px-4 py-2 bg-gray-200 mt-2 rounded-lg ${
                    passwordValidate[0]
                      ? "border-2 border-red-500"
                      : "border-none"
                  }`}
                  placeholder="********"
                  value={password}
                  onChange={(e) => handleChangeText(e)}
                />
                {passwordValidate[0] ? (
                  <span className="text-xs mt-1 text-red-500">
                    * {passwordValidate[1]}
                  </span>
                ) : null}
              </div>
              <div className="flex justify-between items-center mt-4">
                <p>
                  Have an Account ?{" "}
                  <span
                    className="font-bold text-blue-500 border-b-2 border-blue-500"
                    onClick={() => history.push("/login")}
                  >
                    Login
                  </span>
                </p>
                <button
                  className={`text-white px-6 py-2 rounded-lg ${
                    loading
                      ? "cursor-not-allowed bg-gray-400"
                      : "cursor-pointer bg-blue-500"
                  }`}
                  onClick={() => handleRegisterSubmit()}
                >
                  Register
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
  registerUser: (data) => dispatch(registerUser(data)),
});

export default connect(null, reduxDispatch)(Register);
