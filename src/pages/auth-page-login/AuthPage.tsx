import LoginForm from 'src/components/LoginForm/LoginForm';
import './AuthPage.css'
import { Link } from 'react-router-dom';

const AuthPage = () => {
  return (
    <div className="login__container">
        <h1 className='login__header'>{"Login"}</h1>
        <LoginForm></LoginForm>
        <p className='login__footer'>Don't have an account?{' '}
          <Link to='/auth/signup'>
          <b>Sign up</b>
          </Link>
        </p>
    </div>
  )
};

export default AuthPage;