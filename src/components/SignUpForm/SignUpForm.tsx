import {createUserWithEmailAndPassword } from "firebase/auth";
import './SignUpForm.css'
import React, { useEffect, useState } from 'react';
import {auth} from '../../firebase'


const SignUpForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidRepeat, setIsValidRepeat] = useState(true);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    /* 
        on every input, checks if sign up button should be disabled 
    */
    const checkButtonValidation = () => {
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
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.trim())) {
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

    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log(userCredential);
          })
          .catch((error) => {
            console.log(error)
          });
        
    }
      
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        checkEmail();
        checkPasswords();
        if(!isValidEmail || !isValidPassword || !isValidRepeat) return;
        signUp();
    }
    
    useEffect(() => {
        checkButtonValidation();
    }, [email, password, repeatPassword]);
      

    return(
        <form className='signUpForm' onSubmit={handleSubmit}>
            <label className='label'><b>Email</b></label>
            <input type='text' className='emailInput' placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)}></input>
            {!isValidEmail && (
                <div className='invalidTextSU'>Please enter a valid email address.</div>
            )}
            <label className='label'><b>Password</b></label>
            <input type='text' className='passwordInput' placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)}></input>
            {!isValidPassword && (
                <div className='invalidTextSU'> {"Must be at least 6 symbols: lowercase letter, uppercase letter and a number."}</div>
            )}
            <label className='label'><b>Repeat Password</b></label>
            <input type='text' className='repeatPasswordInput' placeholder='Enter your password again' onChange={(e)=>setRepeatPassword(e.target.value)}></input>
            {!isValidRepeat && (
                <div className='invalidTextSU'> {"Passwords must match."}</div>
            )}

            <input type="submit" className={isButtonDisabled ? 'signUpButton--disabled' : 'signUpButton--active'} value={"Create Account"} disabled={isButtonDisabled}/>
        </form>
    )
}

export default SignUpForm;


