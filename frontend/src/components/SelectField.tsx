import React from "react";
import Select from "react-dropdown-select";

export default function SelectField(props: {
  options: any[];
  values: any[] | any;
  onChange: any;
}) {
  const { options, values, onChange } = props;
  return (
    <>
      <Select
        className="select-field"
        options={options}
        values={values}
        onChange={onChange}
        clearable
        searchable
        separator
      />
    </>
  );
}
