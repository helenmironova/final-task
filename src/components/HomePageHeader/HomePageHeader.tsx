import { Link } from 'react-router-dom';
import './HomePageHeader.css'
import { useSelector } from 'react-redux';

const HomePageHeader = () => {
    const email = useSelector((state: any)=>state.user)

    return(
        <div className='headerWrapper'>
            <p className='userEmail'>{email}</p>
            <Link to={"/auth/login"} className='logOut'>Log out</Link>
        </div>
    )
}

export default HomePageHeader;