import { Link } from 'react-router-dom';
import './HomePageHeader.css'
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { setNewUser } from '../../store/user';

const HomePageHeader = () => {
    const email = useSelector((state: any)=>state.user)
    const dispatch = useDispatch();

    const logOut = () => {
        signOut(auth).then(() => {
            dispatch(setNewUser(""))
        }).catch((error) => {console.log(error)});
    }

    return(
        <div className='headerWrapper'>
            <p className='userEmail'>{email}</p>
            <Link to={"/auth/login"} className='logOut' onClick={logOut}>Log out</Link>
        </div>
    )
}

export default HomePageHeader;