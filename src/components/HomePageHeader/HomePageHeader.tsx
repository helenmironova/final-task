import { Link } from 'react-router-dom';
import './HomePageHeader.css'

const HomePageHeader = () => {
    return(
        <div className='wrapper'>
            <p className='userEmail'>your_email@email.com</p>
            <Link to={""} className='logOut'>Log out</Link>
        </div>
    )
}

export default HomePageHeader;