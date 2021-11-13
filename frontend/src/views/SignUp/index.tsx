import { useFormik } from "formik";
// Components
import InputField from "components/InputField";
import Button from "components/Button";
import PhoneNumberField from "components/PhoneNumberField";
import Checkbox from "components/Checkbox";
import SelectField from "components/SelectField";

export default function SignUp() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      gender: "",
      phoneNumber: { code: "TR", number: "" },
      password: "",
      emailUpdates: false,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mx-auto ">
        <div className="w-full flex flex-col gap-y-4">
          <InputField
            id="isim"
            label="İsim"
            style={{ width: "416px" }}
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />

          <InputField
            id="email"
            label="Email"
            style={{ width: "416px" }}
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          <PhoneNumberField
            formik={formik}
            selected={formik.values.phoneNumber.code}
            onSelect={(code: any) =>
              formik.setFieldValue("phoneNumber.code", code)
            }
          />

          <SelectField
            options={[
              { value: "erkek", label: "Erkek" },
              { value: "kadın", label: "Kadın" },
            ]}
            onChange={(e: any) =>
              formik.setFieldValue("gender", e.target.value)
            }
            value={formik.values.gender}
            name="gender"
            id="cinsiyet"
            label="Cinsiyet"
            style={{ width: "416px" }}
          />

          <Button
            id="kayıt_ol"
            type="submit"
            label="Kayıt Ol"
            style={{ width: "416px" }}
          />
        </div>
      </div>
    </form>
  );
}
