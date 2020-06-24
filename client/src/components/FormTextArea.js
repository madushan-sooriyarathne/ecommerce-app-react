import React, { memo } from "react";

import useStyles from "../styles/components/FormTextAreaStyles";

const FormTextArea = ({
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
    <div className={classes.FormTextArea} style={styles}>
      <textarea
        className={classes.FormTextArea_textarea}
        type={type}
        placeholder={label}
        required={isRequired}
        value={value}
        onChange={onChange}
        id={id}
        disabled={isDisabled}
        rows={4}
      ></textarea>
      {withLabel && (
        <label className={classes.FormTextArea_label} htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
};

export default memo(FormTextArea);
