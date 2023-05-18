import './SignUpForm.css'
import React, { useState } from 'react';


const SignUpForm = () => {
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidRepeat, setIsValidRepeat] = useState(true);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    /* 
        on every input, checks if sign up button should be disabled 
    */
    const checkButtonValidation = () => {
        const emailInput = document.querySelector('.emailInput') as HTMLInputElement;
        const passwordInput = document.querySelector('.passwordInput') as HTMLInputElement;
        const repeatPasswordInput = document.querySelector('.repeatPasswordInput') as HTMLInputElement;
        const email = emailInput.value;
        const password = passwordInput.value;
        const repeatPassword = repeatPasswordInput.value;
        if(email.length==0 || password.length==0 || repeatPassword.length==0){
            setIsButtonDisabled(true);
        }else{
            setIsButtonDisabled(false);
        }
    }

    /*
        checks email input. updates invalid text displa. updates input visual;
    */
    const checkEmail = () => {
        const emailInput = document.querySelector('.emailInput') as HTMLInputElement;
        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setIsValidEmail(false);
            emailInput.style.border = "2px solid #EC3030";
        } else {
            setIsValidEmail(true);
            emailInput.style.border = "0";
        }
    }

    /*
        checks both passwords. updates invalid text display. updates inputs visual;
    */
    const checkPasswords = () => {
        const passwordInput = document.querySelector('.passwordInput') as HTMLInputElement;
        const repeatPasswordInput = document.querySelector('.repeatPasswordInput') as HTMLInputElement;
        const password = passwordInput.value;
        const repeatPassword = repeatPasswordInput.value;
      
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
      
        if (!passwordPattern.test(password)) {
            setIsValidPassword(false);
            passwordInput.style.border = "2px solid #EC3030";
        }else{
            setIsValidPassword(true);
            passwordInput.style.border = "0";
        }

        if(password!=repeatPassword){
            setIsValidRepeat(false);
            repeatPasswordInput.style.border = "2px solid #EC3030";

        }else{
            setIsValidRepeat(true);
            repeatPasswordInput.style.border = "0";
        }

    };
      
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        checkEmail();
        checkPasswords();
    }

    return(
        <form className='signUpForm' onSubmit={handleSubmit}>
            <label className='label'><b>Email</b></label>
            <input type='text' className='emailInput' placeholder='Enter your email' onInput={checkButtonValidation}></input>
            {!isValidEmail && (
                <div className='invalidTextSU'>Please enter a valid email address.</div>
            )}
            <label className='label'><b>Password</b></label>
            <input type='text' className='passwordInput' placeholder='Enter your password' onInput={checkButtonValidation}></input>
            {!isValidPassword && (
                <div className='invalidTextSU'> {"Must be at least 6 symbols: lowercase letter, uppercase letter and a number."}</div>
            )}
            <label className='label'><b>Repeat Password</b></label>
            <input type='text' className='repeatPasswordInput' placeholder='Enter your password again' onInput={checkButtonValidation}></input>
            {!isValidRepeat && (
                <div className='invalidTextSU'> {"Passwords must match."}</div>
            )}

            <input type="submit" className={isButtonDisabled ? 'signUpButton--disabled' : 'signUpButton--active'} value={"Create Account"} disabled={isButtonDisabled}/>
        </form>
    )
}

export default SignUpForm;


