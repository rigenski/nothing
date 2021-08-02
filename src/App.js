import React, { useEffect } from "react";
import "./App.css";
import Router from "./router";

import { connect } from "react-redux";

function App(props) {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { isLogin } = props;

    if (user) {
      isLogin(true);
    } else {
      isLogin(false);
    }
  }, [props.login]);

  return (
    <div
      className={`font-app text-gray-800 flex flex-col h-screen ${
        props.darkMode ? "dark" : ""
      }`}
    >
      <Router />
    </div>
  );
}

const reduxState = (state) => ({
  darkMode: state.darkMode,
  login: state.login,
});

const reduxDispatch = (dispatch) => ({
  isLogin: (data) => dispatch({ type: "IS_LOGIN", value: data }),
});

export default connect(reduxState, reduxDispatch)(App);
