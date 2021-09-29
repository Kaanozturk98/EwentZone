import { useState } from "react";

export default function InputField(props: {
  id?: string;
  label: string;
  style?: object;
  className?: string;
  icon?: any;
}) {
  const { id, label, style, className, icon } = props;
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: any) => setValue(e.target.value);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const baseClasses = `h-14 ${
    icon ? "pr-14" + " " + "pl-4" : "px-4"
  } pt-2 border-2 border-gray-200 rounded-lg bg-blue-50 transition-colors hover:border-primary-500 focus:border-primary-500 outline-none text-sm`;
  const tailwindClasses =
    className !== undefined ? className + " " + baseClasses : baseClasses;

  return (
    <div
      className={`flex-initial relative block` + " " + className}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div className="absolute inset-y-0 right-0 px-4 flex items-center">
        {icon}
      </div>
      <input
        id={id || "inputField"}
        value={value}
        onChange={handleChange}
        style={style || {}}
        className={baseClasses + " " + className}
      />
      <label
        htmlFor={id || "inputField"}
        className={`absolute top-0 left-0 px-4 flex items-center transition-all cursor-text
          ${isFocused || value ? "text-primary" : "text-gray-500"} 
          ${isFocused || value ? "h-6" : "h-full"}
          ${isFocused || value ? "text-xs" : ""}
          `}
      >
        {label}
      </label>
    </div>
  );
}
