import React from 'react';
// import AuthForm from "./AuthForm";
import { useDispatch } from 'react-redux';
import { signupThunk } from '../../store/userSlice';
// import { useNavigate } from "react-router";

export default function Signup() {
  const dispatch = useDispatch();
  const signup = (email, pass) => {
    dispatch(signupThunk(email, pass));
  };

  return (
    <div style={{ padding: 15 }}>
      Для регистрации заполните форму:
      {/* <AuthForm buttonText="Sign up" handleSubmit={signup} /> */}
    </div>
  );
}
