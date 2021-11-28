export default function RibbonCategory(props: {
  label: string;
  backgroundImage: string;
}) {
  const { label, backgroundImage } = props;

  return (
    <div
      className="h-20 max-w-full w-full min-w-25 rounded-lg bg-image flex items-center justify-between cursor-pointer"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "right center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <span className="w-full text-center text-babyPowder text-sm sm:text-base md:text-lg lg:text-xl font-bold">
        {label}
      </span>
    </div>
  );
}
