import { useFormik } from "formik";
// Components
import InputField from "components/InputField";
import Button from "components/Button";

export default function SignUp() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
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
            id="email"
            label="Email"
            style={{ width: "416px" }}
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          <InputField
            id="sifre"
            type="password"
            label="Sifre"
            style={{ width: "416px" }}
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />

          <Button
            id="giris_yap"
            type="submit"
            label="Giriş Yap"
            style={{ width: "416px" }}
          />
        </div>
      </div>
    </form>
  );
}
