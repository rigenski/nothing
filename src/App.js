import React, { useEffect } from "react";
import Router from "./router";

import { connect } from "react-redux";

function App(props) {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { setUser, isLogin } = props;

    if (user) {
      isLogin(true);
      setUser(user.uid);
    } else {
      isLogin(false);
    }
  }, [props.login]);

  return (
    <div
      className={`font-app text-gray-800 flex flex-col h-screen ${
        props.darkTheme ? "dark" : ""
      }`}
    >
      <Router />
    </div>
  );
}

const reduxState = (state) => ({
  darkTheme: state.darkTheme,
  login: state.login,
});

const reduxDispatch = (dispatch) => ({
  setUser: (data) => dispatch({ type: "SET_USER", value: data }),
  isLogin: (data) => dispatch({ type: "IS_LOGIN", value: data }),
});

export default connect(reduxState, reduxDispatch)(App);
