import React from "react";

function RadioColor(props) {
  return (
    <li className={`radio-${props.color}`}>
      <div
        className={`h-6 w-6 cursor-pointer ${
          props.color === "white" ? "bg-white" : `bg-${props.color}-500`
        } rounded-full mr-1 radio-item border-2 border-gray-200`}
        onClick={() => props.selectColor(props.color)}
      ></div>
    </li>
  );
}

export default RadioColor;
