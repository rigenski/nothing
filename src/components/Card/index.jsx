import React from "react";

function Card(props) {
  return (
    <div className="w-1/2 md:w/1-3 lg:w-1/4 p-1">
      <div
        className={`px-4 py-2 border-2 border-black bg-${props.data.data.color}-400 text-black rounded shadow-child font-child cursor-pointer`}
      >
        <span className="text-xs">
          {new Date(props.data.data.date).toISOString().slice(0, 10)}
        </span>
        <h2 className="font-semibold mb-2">
          {props.data.data.title ? props.data.data.title : "No Title"}
        </h2>
        <p className="text-sm">
          {props.data.data.content
            ? props.data.data.content
            : "No Description Content"}
        </p>
      </div>
    </div>
  );
}

export default Card;
