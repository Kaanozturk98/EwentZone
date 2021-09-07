import React from "react";

export default function Button(props: {
  id?: string;
  label?: string;
  style?: object;
}) {
  const { id, label, style } = props;

  const handleSubmit = () => console.log("submit");

  return (
    <button
      id={id || "button"}
      className="bg-primary-400 text-center rounded-lg text-sm font-semibold text-white px-4 h-14 transition-colors hover:bg-primary-500"
      style={style || {}}
      onClick={handleSubmit}
    >
      {label || ""}
    </button>
  );
}
