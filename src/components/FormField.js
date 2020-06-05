import React from "react";

import useStyles from "../styles/components/FormFieldStyles";

const FormField = ({
  label,
  id,
  type = "text",
  isRequired = true,
  isDisabled = false,
  value = "",
  onChange = () => {},
  withLabel = true,
  styles = {},
}) => {
  const classes = useStyles({ isDisabled });
  return (
    <div className={classes.FormField} style={styles}>
      <input
        className={classes.FormField_input}
        type={type}
        placeholder={label}
        required={isRequired}
        value={value}
        onChange={onChange}
        id={id}
        disabled={isDisabled}
      ></input>
      {withLabel && (
        <label className={classes.FormField_label} htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
};

export default FormField;
