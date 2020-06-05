import React from "react";
import CenteredPage from "./CenteredPage";
import Container from "../components/Container";
import HeadingPrimary from "../components/headings/HeadingPrimary";
import FormContainer from "../components/FormContainer";
import FormField from "../components/FormField";
import ButtonStatic from "../components/buttons/ButtonStatic";
import useInputState from "../hooks/UseInputState";

const UpdateEmail = () => {
  const [email, updateEmail, resetEmail] = useInputState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(email);
    //Reset Field
    resetEmail();
  };

  return (
    <CenteredPage>
      <Container>
        <HeadingPrimary>Update Email</HeadingPrimary>
        <FormContainer handleSubmit={handleSubmit}>
          <FormField
            id="EmailField"
            label="New Email"
            type="email"
            value={email}
            onChange={updateEmail}
            isRequired={true}
          />
          <ButtonStatic
            primaryColor="var(--color-primary)"
            secondaryColor="var(--color-white)"
            type="submit"
            isSmall={true}
            styles={{ marginTop: "1rem", alignSelf: "stretch  " }}
          >
            Update Email
          </ButtonStatic>
        </FormContainer>
      </Container>
    </CenteredPage>
  );
};

export default UpdateEmail;
