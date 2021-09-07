import Video from "assets/heroSectionVideo.mp4";
import InputField from "components/InputField";

export default function HeroSection() {
  return (
    <div className="relative">
      <video
        autoPlay
        loop
        muted
        className="w-full h-120 top-1/2 left-1/2 object-cover -z-10"
      >
        <source src={Video} type="video/mp4" />
      </video>
      {
        // Take a re-look at the inset value
      }
      <div className="h-full w-full z-10 absolute top-0 inset-1/10 flex items-center">
        <div className="">
          <div className="text-white text-4xl text-bold">
            It’s time to unwind
          </div>
          <div className="text-white text-xl text-bold mt-8">
            Enjoy or gift 2,000+ artisan workshops and craft kits
          </div>
          <div className={"rounded-lg bg-gray-100 p-3 mt-8 flex gap-x-4"}>
            <InputField placeholder="City / Model" width="350px" />
            <InputField placeholder="Recomendations" />
            <button className="bg-red-900 text-center rounded-lg w-1/4 text-sm font-semibold text-white px-4 h-14">
              See Classes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
