import InputField from "components/InputField";
import Button from "components/Button";

export default function HeroSection() {
  return (
    <div className="relative">
      <div
        className="top-1/2 left-1/2 object-cover -z-10 bg-yellowOrange"
        style={{ width: "100vw", height: "30vw", minHeight: "50vh" }}
      />
      {
        // Take a re-look at the inset value
      }
      <div className="h-full w-auto z-10 absolute top-0 inset-1/10 flex items-center">
        <div className="">
          <div className="text-gray-800 text-4xl font-bold">
            Zevki Keşfetmenin En Kolay Yolu.
          </div>
          <div className="text-gray-600 text-xl font-bold mt-8">
            Onlarca farklı atölyenin keyfini çıkar!
          </div>
          <div className={"rounded-lg bg-white p-3 mt-8 flex gap-x-4"}>
            <InputField id="city" label="City" />
            <InputField id="recommendation" label="Recommendation" />
            <Button
              id="City_Model"
              label="Atölye Ara"
              style={{ width: "25%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
