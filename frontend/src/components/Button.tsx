import { MouseEventHandler } from "react";

export default function Button(props: {
  id?: string;
  label?: string;
  style?: object;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  const { id, label, style, className, type = "button", ...rest } = props;

  return (
    <button
      id={id || "button"}
      className={"button" + " " + className}
      style={style || {}}
      type={type}
      {...rest}
    >
      {label || ""}
    </button>
  );
}
