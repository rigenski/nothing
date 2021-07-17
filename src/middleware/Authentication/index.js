import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

function Authentication(props) {
  const history = useHistory();
  const { login } = props;
  useEffect(() => {
    if (!login) {
      history.push("/login");
    }
  });
  return props.render;
}

const reduxState = (state) => ({
  login: state.isLogin,
});

const reduxDispatch = (dispatch) => ({});

export default connect(reduxState, reduxDispatch)(Authentication);
