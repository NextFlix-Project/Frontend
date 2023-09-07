import { useState } from "react";
import axios from "axios";
import RegistrationForm from "../../components/registration/RegistrationForm";
import './RegistrationPage.css';

import { redirect } from "react-router-dom";
function RegistrationPage() {
  return (
    <div className='registration-page'>
      <RegistrationForm />
    </div>
  );
}

export default RegistrationPage;
