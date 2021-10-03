export default function Button(props: {
  id?: string;
  label?: string;
  style?: object;
  className?: String;
}) {
  const { id, label, style, className } = props;

  const handleSubmit = () => console.log("submit");

  return (
    <button
      id={id || "button"}
      className={"button" + " " + className}
      style={style || {}}
      onClick={handleSubmit}
    >
      {label || ""}
    </button>
  );
}
