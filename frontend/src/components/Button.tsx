export default function Button(props: {
  id?: string;
  label?: string;
  style?: object;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
}) {
  const { id, label, style, className, type = "button" } = props;

  return (
    <button
      id={id || "button"}
      className={"button" + " " + className}
      style={style || {}}
      type={type}
    >
      {label || ""}
    </button>
  );
}
