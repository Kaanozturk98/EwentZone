import Video from "assets/heroSectionVideo.mp4";
import InputField from "components/InputField";
import Button from "components/Button";

export default function HeroSection() {
  return (
    <div className="relative">
      <video
        autoPlay
        loop
        muted
        className="top-1/2 left-1/2 object-cover -z-10"
        style={{ width: "100vw", height: "30vw", minHeight: "50vh" }}
      >
        <source src={Video} type="video/mp4" />
      </video>
      {
        // Take a re-look at the inset value
      }
      <div className="h-full w-auto z-10 absolute top-0 inset-1/10 flex items-center">
        <div className="">
          <div className="text-white text-4xl font-bold">
            It’s time to unwind
          </div>
          <div className="text-white text-xl font-bold mt-8">
            Enjoy or gift 2,000+ artisan workshops and craft kits
          </div>
          <div className={"rounded-lg bg-gray-100 p-3 mt-8 flex gap-x-4"}>
            <InputField id="city_model" label="City / Model" />
            <InputField id="recommendation" label="Recommendation" />
            <Button
              id="City_Model"
              label="See Classes"
              style={{ width: "25%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
