import React from "react";

function Footer(props) {
  return (
    <footer className="mt-8">
      <div class="text-center p-8 ">
        <h4 class="text-gray-700 font-medium">
          Show project on{" "}
          <a
            href="https://github.com/rygenzx/nothing"
            target="_blank"
            id="icon-github"
          >
            <i class="fab fa-github"></i> <span class="font-bold">Github</span>
          </a>
        </h4>
        <h4 class="text-gray-700 font-medium mt-1">
          Made with <i class="fas fa-coffee" id="icon-coffe"></i> by{" "}
          <a class="font-bold" href="http://rygenzx.github.io" id="name-footer">
            Rigen Maulana
          </a>
        </h4>
      </div>
    </footer>
  );
}

export default Footer;
