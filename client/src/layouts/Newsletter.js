import React from "react";

import useInputState from "../hooks/UseInputState";

import FormField from "../components/FormField";
import Button from "../components/buttons/Button";

import useStyles from "../styles/layouts/NewsletterStyles";
import {
  showNotification,
  removeNotification,
} from "../redux/reducers/notification/NotifcationActions";
import { connect } from "react-redux";

const Newsletter = ({ showNotification, removeNotification }) => {
  const classes = useStyles();

  const [email, updateEmail, resetEmail] = useInputState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO : implement the saving user's email functionality
    showNotification({
      message: "You have successfuly subscribe to our newslatter",
      type: "success",
    });
    setTimeout(() => removeNotification(), 5000);

    //Clear the field
    resetEmail();
  };

  return (
    <div className={classes.Newsletter}>
      <p className={classes.Newsletter_message}>
        Get latest updates on new collections & offers...
      </p>
      <form className={classes.Newsletter_input} onSubmit={handleSubmit}>
        <FormField
          id="emailField"
          label="Email"
          type="email"
          value={email}
          onChange={updateEmail}
          withLabel={false}
          isRequired={true}
        />
        <Button type="submit" isSmall={true}>
          Subscribe
        </Button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  showNotification: (notification) => dispatch(showNotification(notification)),
  removeNotification: () => dispatch(removeNotification()),
});

export default connect(null, mapDispatchToProps)(Newsletter);
