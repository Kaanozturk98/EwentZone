import { useState } from "react";

export default function InputField(props: {
  placeholder: string;
  width?: string;
}) {
  const { placeholder, width } = props;
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
        id="inputField"
        value={value}
        onChange={handleChange}
        style={{ width: width || "auto" }}
        className="h-14 px-4 pt-2 border-2 border-gray-200 rounded-lg bg-yellow-50 transition-colors hover:border-red-900 focus:border-red-900 outline-none text-sm"
      />
      <label
        htmlFor="inputField"
        style={{ width: width || "auto" }}
        className={`absolute top-0 left-0 px-4 flex items-center transition-all cursor-text
          ${isFocused || value ? "text-red-900" : "text-gray-500"} 
          ${isFocused || value ? "h-6" : "h-full"}
          ${isFocused || value ? "text-xs" : ""}
          `}
      >
        {placeholder}
      </label>
    </div>
  );
}
