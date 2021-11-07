import { useFormik } from "formik";
// Components
import InputField from "components/InputField";
import Button from "components/Button";

export default function SignUp() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
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
            style={{ width: "418px" }}
            name="firstName"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
          <InputField
            id="soy_isim"
            label="Soy İsim"
            style={{ width: "418px" }}
            name="lastName"
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
          <InputField
            id="email"
            label="Email"
            style={{ width: "418px" }}
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <Button
            id="City_Model"
            type="submit"
            label="Kayıt Ol"
            style={{ width: "418px" }}
          />
        </div>
      </div>
    </form>
  );
}
