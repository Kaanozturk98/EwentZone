import { useState } from "react";

export default function InputField(props: {
  id?: string;
  label: string;
  style?: object;
}) {
  const { id, label, style } = props;
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: any) => setValue(e.target.value);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div
      className={`flex-initial relative block`}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <input
        id={id || "inputField"}
        value={value}
        onChange={handleChange}
        style={style || {}}
        className="h-14 px-4 pt-2 border-2 border-gray-200 rounded-lg bg-yellow-50 transition-colors hover:border-primary-500 focus:border-primary-500 outline-none text-sm"
      />
      <label
        htmlFor={id || "inputField"}
        style={style || {}}
        className={`absolute top-0 left-0 px-4 flex items-center transition-all cursor-text
          ${isFocused || value ? "text-primary-500" : "text-gray-500"} 
          ${isFocused || value ? "h-6" : "h-full"}
          ${isFocused || value ? "text-xs" : ""}
          `}
      >
        {label}
      </label>
    </div>
  );
}
