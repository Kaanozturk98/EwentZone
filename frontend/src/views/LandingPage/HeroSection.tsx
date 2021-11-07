import { useFormik } from "formik";
// Components
import InputField from "components/InputField";
import Button from "components/Button";
// Icons
import { HiUserGroup } from "react-icons/hi";
// Image
import heroSection1 from "assets/heroSection1.jpg";
/*
 <img
          src={heroSection1}
          alt="image"
          style={{
            height: "100%",
            width: "auto",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />


      <div
        style={{
          height: "110%",
          width: "auto",
          borderRadius: "50%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-12%, -50%)",
          backgroundImage: `url(${heroSection1})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>


      <div
        style={{
          position: "absolute",
          top: 0,
          right: `${100 / 6}%`,
          height: "100%",
          width: "auto",
          overflow: "hidden",
        }}
      >
        <img
          src={heroSection1}
          alt="image"
          style={{
            height: "100%",
            width: "auto",
            borderRadius: "40%",
            objectFit: "cover",
          }}
        />
      </div>
      */
export default function HeroSection() {
  const formik = useFormik({
    initialValues: {
      city: "",
      personCount: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="relative">
      <div
        className="top-1/2 left-1/2 object-cover -z-10 bg-yellowOrange"
        style={{ height: "30vw", minHeight: "50vh" }}
      />
      {
        // Take a re-look at the inset value
      }
      <div className="h-full w-auto z-10 absolute top-0 left-1/6 flex items-center">
        <div className="">
          <div className="text-gray-800 text-4xl font-bold">
            Zevki Keşfetmenin En Kolay Yolu.
          </div>
          <div className="text-gray-700 text-xl font-bold mt-8">
            Onlarca farklı atölyenin keyfini çıkar!
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="rounded-lg bg-gray-100 p-3 mt-8 flex gap-x-4">
              <InputField
                id="sehir"
                label="Şehir"
                name="city"
                onChange={formik.handleChange}
                value={formik.values.city}
              />
              <InputField
                id="kisi_sayisi"
                label="Sayı"
                type="number"
                name="personCount"
                icon={<HiUserGroup size={24} />}
                style={{ maxWidth: "124px" }}
                onChange={formik.handleChange}
                value={formik.values.personCount}
              />
              <Button
                id="City_Model"
                label="Atölye Ara"
                style={{ width: "25%" }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
