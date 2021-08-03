import { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

function Guest(props) {
  const history = useHistory();

  useEffect(() => {
    if (props.login) {
      history.push("/");
    }
  }, [props.login]);

  return props.render;
}

const reduxState = (state) => ({
  login: state.login,
});

export default connect(reduxState, null)(Guest);
