import { useState } from "react";
import { useFormik } from "formik";
import ReactFlagsSelect, { Tr } from "react-flags-select";
//
import { countryCodes } from "assets/countryCodes";
//
import InputField from "./InputField";

export default function PhoneNumberField(props: {
  formik: any;
  onSelect: any;
  selected: string;
}) {
  const { formik, onSelect, selected } = props;
  const [isRightFocused, setIsRightFocused] = useState(false);

  const handleRightFocus = () => setIsRightFocused(true);
  const handleRightBlur = () => setIsRightFocused(false);

  const [isLeftFocused, setIsLeftFocused] = useState(false);

  const handleLeftFocus = () => setIsLeftFocused(true);
  const handleLeftBlur = () => setIsLeftFocused(false);

  const customLabel: any = {};

  countryCodes.forEach((item) => {
    customLabel[item.name] = item.code;
  });

  countryCodes.map((item) => item.name);

  return (
    <div
      className="flex flex-row gap-x-4"
      style={{ width: "416px", height: "56px" }}
    >
      <ReactFlagsSelect
        countries={["TR"]}
        customLabels={{ TR: "+90" }}
        selected={selected}
        onSelect={onSelect}
        className="flag-select"
      />
      <InputField
        id="telefon_numarası"
        label="Telefon Numarası"
        style={{ width: "272px", height: "56px" }}
        name="phoneNumber.number"
        onChange={formik.handleChange}
        value={formik.values.phoneNumber.number}
      />
    </div>
  );
}
