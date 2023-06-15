import { Link } from 'react-router-dom';
import './HomePageHeader.css'
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { setNewUser } from '../../store/user';

const HomePageHeader = () => {
    const dispatch = useDispatch();
    //email of current user;
    const email = useSelector((state: any)=>state.user)

    /*
        signs out of firebase account;
        sets user (in redux) to an empty string (no user);
    */
    const logOut = () => {
        signOut(auth).then(() => {
            dispatch(setNewUser(""))
            //removes previous searched etc data;
            window.location.reload();
            sessionStorage.clear();
        }).catch((error) => {console.log(error)});
    }

    return(
        <div className='headerWrapper'>
            <div className='wrap'>
                <p className='userEmail'>{email}</p>
                <Link to={"/auth/login"} className='logOut' onClick={logOut}>Log out</Link>
            </div>
        </div>
    )
}

export default HomePageHeader;