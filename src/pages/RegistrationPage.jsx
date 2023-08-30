import { useState } from "react";
import axios from "axios";
import RegistrationForm from "../components/registration/RegistrationForm";

import { redirect } from "react-router-dom";
function RegistrationPage() {
  return (
    <>
      <RegistrationForm />
    </>
  );
}

export default RegistrationPage;
