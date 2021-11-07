import React from "react";

export default function Checkbox(props: {
  label: string;
  value: boolean;
  onChange: any;
}) {
  const { label, value, onChange } = props;

  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
}
