// Components
import InputField from "components/InputField";
import Button from "components/Button";

export default function SignUp() {
  return (
    <div className="mx-auto ">
      <div className="w-full flex flex-col gap-y-4">
        <InputField id="sehir" label="Şehir" style={{ width: "418px" }} />
        <InputField id="sehir" label="Şehir" style={{ width: "418px" }} />
        <InputField id="sehir" label="Şehir" style={{ width: "418px" }} />
        <InputField id="sehir" label="Şehir" style={{ width: "418px" }} />
        <InputField id="sehir" label="Şehir" style={{ width: "418px" }} />
        <Button id="City_Model" label="Atölye Ara" style={{ width: "418px" }} />
      </div>
    </div>
  );
}
