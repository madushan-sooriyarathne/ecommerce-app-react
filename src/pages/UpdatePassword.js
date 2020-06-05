import React from "react";
import CenteredPage from "./CenteredPage";

import Container from "../components/Container";
import FormField from "../components/FormField";
import ButtonStatic from "../components/buttons/ButtonStatic";
import useInputState from "../hooks/UseInputState";
import FormContainer from "../components/FormContainer";
import HeadingPrimary from "../components/headings/HeadingPrimary";

const UpdatePassword = () => {
  const [
    currentPassword,
    setCurrentPassword,
    resetCurrentPassword,
  ] = useInputState("");
  const [newPassword, setNewPassword, resetNewPassword] = useInputState("");
  const [
    confirmPassword,
    setConfirmPassword,
    resetConfirmPassword,
  ] = useInputState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    alert(`${currentPassword}, ${newPassword}, ${confirmPassword}`);

    //Reset Input Fields
    resetCurrentPassword();
    resetNewPassword();
    resetConfirmPassword();
  };

  return (
    <CenteredPage>
      <Container>
        <HeadingPrimary>Update Password</HeadingPrimary>
        <FormContainer handleSubmit={handleSubmit}>
          <FormField
            id="currentPassword"
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={setCurrentPassword}
            isRequired={true}
          />
          <FormField
            id="newPassword"
            label="New Password"
            type="password"
            value={newPassword}
            onChange={setNewPassword}
            isRequired={true}
          />
          <FormField
            id="confirmNewPassword"
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            isRequired={true}
          />
          <ButtonStatic
            primaryColor="var(--color-primary)"
            secondaryColor="var(--color-white)"
            type="submit"
            isSmall={true}
            styles={{ marginTop: "1rem", alignSelf: "stretch  " }}
          >
            Update Password
          </ButtonStatic>
        </FormContainer>
      </Container>
    </CenteredPage>
  );
};

export default UpdatePassword;
