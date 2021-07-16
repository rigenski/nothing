import React from "react";

function index(props) {
  return (
    <header>
      <div className="container mx-auto py-4 px-2">
        <div className="flex justify-between items-center px-1">
          <h1 className="font-parent text-2xl">nothing</h1>
          <button className="cursor-default shadow-child font-child px-4 py-2 bg-red-400 border-2 border-black rounded">
            <span className="cursor-pointer">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default index;
