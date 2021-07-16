import React from "react";

function Card(props) {
  return (
    <div className="w-1/2 md:w/1-3 lg:w-1/4 p-1">
      <div
        className={`px-4 py-2 border-2 border-black bg-${props.color}-400 text-black rounded shadow-child font-child cursor-pointer`}
      >
        <span className="text-xs">15 Mey, 2021</span>
        <h2 className="font-semibold mb-2">Hello Everyday</h2>
        <p className="text-sm">
          Sed porttitor lectus nibh. Vivamus suscipit tortor eget felis
          porttitor volutpat. Curabitur aliquet quam id dui posuere blandit.
          Donec rutrum congue leo eget malesuada. Donec rutrum congue leo eget
          malesuada.
        </p>
      </div>
    </div>
  );
}

export default Card;
