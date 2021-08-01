import React from "react";

function ButtonColor(props) {
  return (
    <div
      className={`h-6 w-6 bg-white rounded-full border-4 mr-1 border-${props.color}-400 p-1 btn-${props.color}`}
      onClick={() => props.selectColor(props.color)}
    ></div>
  );
}

export default ButtonColor;
