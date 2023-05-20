import './LoginForm.css';
import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import {useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isValidLogin, setIsValidLogin] = useState(true);
  const [isButtonClicked, setIsButtonClicked] = useState(false); 
  const navigate = useNavigate(); 

  const checkPassword = () => {
    const passwordInput = document.querySelector('.password__input') as HTMLInputElement;
    if (password.length >= 6) {
      setIsValidPassword(true);
      passwordInput.style.border = '0';
    } else {
      setIsValidPassword(false);
      passwordInput.style.border = '2px solid #EC3030';
    }
  };

  const checkEmail = () => {
    const emailInput = document.querySelector('.email__input') as HTMLInputElement;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      setIsValidEmail(false);
      emailInput.style.border = '2px solid #EC3030';
    } else {
      setIsValidEmail(true);
      emailInput.style.border = '0';
    }
  };

  const checkInputs = () => {
    checkEmail();
    checkPassword();
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setIsValidLogin(true);
        navigate('/search');
      })
      .catch(() => {
        setIsValidLogin(false);
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('submitted');
    checkInputs();
    if (!(isValidEmail && isValidPassword)) return;
    setIsButtonClicked(true); // Set button clicked
  };

  const checkButtonValidation = () => {
    if (email.length === 0 || password.length === 0) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => {
    checkButtonValidation();
  }, [email, password]);

  useEffect(() => {
    if (isButtonClicked && isValidEmail && isValidPassword) {
      login(); // Execute login when button is clicked and checks pass
    }
  }, [isButtonClicked, isValidEmail, isValidPassword]);

  return (
    <form className="login__form" onSubmit={handleSubmit}>
      <label className="email__label">
        <b>Email</b>
      </label>
      <input
        type="text"
        placeholder="Enter your email"
        className="email__input"
        onChange={(e) => setEmail(e.target.value)}
      />
      {!isValidEmail && <div className="invalidEmailText">Please enter a valid email address.</div>}
      <label className="password__label">
        <b>Password</b>
      </label>
      <input
        type="password"
        placeholder="Enter your password"
        className="password__input"
        onChange={(e) => setPassword(e.target.value)}
      />
      {!isValidPassword && (
        <div className="invalidPasswordText">Password must be at least 6 characters long.</div>
      )}
      {!isValidLogin && (
        <p className="invalidLoginMessage">
          Login failed! Please, check your password and email and try again.
        </p>
      )}
      <input
        type="submit"
        className={isButtonDisabled ? 'login__button--disabled' : 'login__button--active'}
        value="Login"
        disabled={isButtonDisabled}
      />
    </form>
  );
};

export default LoginForm;
