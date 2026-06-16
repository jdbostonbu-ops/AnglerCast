'use client';

import { useState } from 'react';

type PasswordFieldProps = {
  label: string;
  name: string;
};

export const PasswordField = ({ label, name }: PasswordFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((currentIsPasswordVisible) => !currentIsPasswordVisible);
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type={isPasswordVisible ? 'text' : 'password'} />
      <button type="button" onClick={togglePasswordVisibility}>
        {isPasswordVisible ? 'Hide password' : 'Show password'}
      </button>
    </div>
  );
};
