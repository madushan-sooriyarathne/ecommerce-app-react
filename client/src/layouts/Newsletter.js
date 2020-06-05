import React from "react";

import useInputState from "../hooks/UseInputState";

import FormField from "../components/FormField";
import Button from "../components/buttons/Button";

import useStyles from "../styles/layouts/NewsletterStyles";

const Newsletter = () => {
  const classes = useStyles();

  const [email, updateEmail, resetEmail] = useInputState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO : implement the saving user's email functionality
    alert(`You successfully subscribed to our newsletter with ${email}`);

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

export default Newsletter;
