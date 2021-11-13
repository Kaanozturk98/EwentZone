import { useState } from "react";

export default function SelectField(props: {
  options: any[];
  value: any[] | any;
  onChange: any;
  name: string;
  id: string;
  style?: object;
  label?: string;
}) {
  const { options, value, onChange, name, id, style = {}, label = "" } = props;
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div
      className={`flex-initial relative block`}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <select
        className="select-field pr-4 pl-3"
        style={{ ...style }}
        name={name}
        id={id}
        onChange={onChange}
        value={value}
        defaultValue=""
      >
        <option value=""></option>
        {options.map((opt) => (
          <option value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={`absolute top-0 left-0 flex items-center transition-all cursor-text px-4
            ${
              isFocused || (value && value !== "")
                ? "text-primary h-6 text-xs"
                : "text-gray-500 h-full"
            } 
            `}
      >
        {label}
      </label>
    </div>
  );
}
