import './MainPage.css'
import {Link } from "react-router-dom";


const MainPage = () => {
  return (
    <div>
      <h1 className='header'>{"Q-1 Search"}</h1>
      <p className='under--header'>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt u"}</p>
      <Link to='/Auth page/login' className='login--button'><p>{"Login"}</p></Link>
    </div>
  )
};

export default MainPage;