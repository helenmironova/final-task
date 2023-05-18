import './SignUp.css';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import { Link } from 'react-router-dom';


const SignUp = () => {
    return(
        <div className='SignUp__container'>
            <div className='SignUp__header'><p>{"Sign up"}</p></div>
            <SignUpForm></SignUpForm>
            <div className='SignUp__footer'>
                <p>Already have an account?{' '}
                <Link to='/auth/login'>
                    <b>Login</b>
                </Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp;