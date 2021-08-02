import React from "react";

function Footer(props) {
  return (
    <footer className="text-center p-8 transition-all dark:bg-gray-800">
      <h6 className="text-gray-700 font-medium dark:text-gray-200">
        Show project on{" "}
        <a href="https://github.com/rygenzx/nothing" target="_blank">
          <i className="fab fa-github"></i>{" "}
          <span className="font-bold">Github</span>
        </a>
      </h6>
      <h6 className="text-gray-700 font-medium mt-1 dark:text-gray-200">
        Made with <i className="fas fa-coffee" id="icon-coffe"></i> by{" "}
        <a
          className="font-bold"
          href="http://rygenzx.github.io"
          target="_blank"
        >
          Rigen Maulana
        </a>
      </h6>
    </footer>
  );
}

export default Footer;
