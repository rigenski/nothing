import React from "react";

function ButtonColor(props) {
  return (
    <button
      className={`h-6 w-6 bg-white rounded-full border-2 ml-1 border-${props.color}-400 p-1 btn-${props.color}`}
      onClick={() => props.selectColor(props.color)}
    ></button>
  );
}

export default ButtonColor;
