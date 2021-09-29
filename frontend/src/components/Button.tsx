export default function Button(props: {
  id?: string;
  label?: string;
  style?: object;
  className?: String;
}) {
  const { id, label, style, className } = props;

  const handleSubmit = () => console.log("submit");

  const baseClasses =
    "bg-primary text-center rounded-lg text-sm font-semibold text-white px-4 h-14 transition-colors hover:bg-primary-dark";
  const tailwindClasses =
    className !== undefined ? className + " " + baseClasses : baseClasses;

  return (
    <button
      id={id || "button"}
      className={tailwindClasses}
      style={style || {}}
      onClick={handleSubmit}
    >
      {label || ""}
    </button>
  );
}
