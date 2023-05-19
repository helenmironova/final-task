import './LoginForm.css'
import React, { useEffect, useState } from 'react';
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';

const LoginForm = () => {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const checkPassword = () =>{
        const passwordInput = document.querySelector('.password__input') as HTMLInputElement;
        if(password.length>=6){
            setIsValidPassword(true);
            passwordInput.style.border = "0";
        }else{
            setIsValidPassword(false);
            passwordInput.style.border = "2px solid #EC3030";
        }
    }

    const checkEmail = () => {
        const emailInput = document.querySelector('.email__input') as HTMLInputElement;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.trim())) {
            setIsValidEmail(false);
            emailInput.style.border = "2px solid #EC3030";
        } else {
            setIsValidEmail(true);
            emailInput.style.border = "0";
        }
    };

    const checkInputs = () =>{
        checkEmail();
        checkPassword();
    }

    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log(userCredential);
          })
          .catch((error) => {
           console.log(error);
          });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        console.log("submited");
        checkInputs();
        if(!(isValidEmail && isValidPassword)) return;
        login();
    };

    /*
        when user changes in password or email fields, isButtonDisabled changes to set button validation status;
    */
    const checkButtonValidation = () =>{
        if(email.length==0 || password.length==0){
            setIsButtonDisabled(true);
        }else{
            setIsButtonDisabled(false);
        }
    }

    useEffect(() => {
        checkButtonValidation();
    }, [email, password]);
      
    return(
        <form className='login__form' onSubmit={handleSubmit}>
            <label className='email__label'>{<b>Email</b>}</label>
            <input type='text' placeholder='Enter your email' className='email__input' onChange={(e)=>setEmail(e.target.value)}></input>
            {!isValidEmail && (
                <div className='invalidEmailText'>Please enter a valid email address.</div>
            )}
            <label className='password__label'>{<b>Password</b>}</label>
            <input type='password' placeholder='Enter your password' className='password__input' onChange={(e)=>setPassword(e.target.value)}></input>
            {!isValidPassword && (
                <div className='invalidPasswordText'>Password must be at least 6 characters long.</div>
            )}
            <input type="submit" className={isButtonDisabled ? 'login__button--disabled' : 'login__button--active'} value="Login" disabled={isButtonDisabled}/>
        </form>
    )
}
export default LoginForm;