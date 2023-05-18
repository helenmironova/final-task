import LoginForm from 'src/components/LoginForm/LoginForm';
import './AuthPage.css'

const AuthPage = () => {
  return (
    <div className="login__container">
        <h1 className='login__header'>{"Login"}</h1>
        <LoginForm></LoginForm>
    </div>
  )
};

export default AuthPage;