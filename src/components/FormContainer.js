import React from "react";

import useStyles from "../styles/components/FormContainerStyles";

const FormContainer = ({ children, handleSubmit }) => {
  const classes = useStyles();
  return (
    <form className={classes.FormContainer} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default FormContainer;
