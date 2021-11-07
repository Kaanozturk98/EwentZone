import { useState } from "react";

export default function InputField(props: {
  id?: string;
  type?: string;
  label?: string;
  style?: object;
  className?: string;
  icon?: any;
  name?: string;
  value: any;
  onChange: any;
}) {
  const {
    id,
    type = "text",
    label = "",
    style,
    className,
    icon,
    name,
    value,
    onChange,
  } = props;
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  let baseClasses = "";

  if (icon) {
    switch (type) {
      case "number":
        baseClasses = "pl-14";
        break;
      default:
        baseClasses = "pr-14 pl-4";
        break;
    }
  } else {
    switch (type) {
      case "number":
        baseClasses = "px-4";
        break;
      default:
        baseClasses = "px-4";
        break;
    }
  }

  return (
    <div
      className={`flex-initial relative block`}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {icon && (
        <div
          className={`absolute inset-y-0 px-4 flex items-center`}
          style={{
            left: type === "number" ? 0 : "auto",
            right: type !== "number" ? 0 : "auto",
          }}
        >
          {icon}
        </div>
      )}

      <input
        id={id || "inputField"}
        type={type || ""}
        min="1"
        name={name || ""}
        value={value}
        onChange={onChange}
        style={style || {}}
        className={"inputField pr-4" + " " + baseClasses + " " + className}
      />
      <label
        htmlFor={id || "inputField"}
        className={
          `absolute top-0 left-0 flex items-center transition-all cursor-text
          ${
            isFocused || value
              ? "text-primary h-6 text-xs"
              : "text-gray-500 h-full"
          } 
          ` + baseClasses
        }
      >
        {label}
      </label>
    </div>
  );
}
