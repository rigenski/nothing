import React from "react";
import { connect } from "react-redux";

function Footer(props) {
  return (
    <footer className={`${props.darkMode ? "dark" : ""}`}>
      <div className="text-center p-8 dark:bg-gray-800">
        <h6 className="text-gray-700 font-medium dark:text-white">
          Show project on{" "}
          <a href="https://github.com/rygenzx/nothing" target="_blank">
            <i className="fab fa-github"></i>{" "}
            <span className="font-bold">Github</span>
          </a>
        </h6>
        <h6 className="text-gray-700 font-medium mt-1 dark:text-white">
          Made with <i className="fas fa-coffee" id="icon-coffe"></i> by{" "}
          <a
            className="font-bold"
            href="http://rygenzx.github.io"
            target="_blank"
          >
            Rigen Maulana
          </a>
        </h6>
      </div>
    </footer>
  );
}

const reduxState = (state) => ({
  darkMode: state.darkMode,
});

export default connect(reduxState, null)(Footer);
