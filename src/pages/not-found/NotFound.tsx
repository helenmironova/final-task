import { useSelector } from 'react-redux';
import HomePageHeader from '../../components/HomePageHeader/HomePageHeader';
import './NotFound.css'
import { useNavigate } from 'react-router';

const NotFound = () => {
    const user = useSelector((state: any)=>state.user);
    const navigate = useNavigate();


    const handleClick = () => {
        console.log("clicked")
        if(user!==null && user!==''){
            navigate('/search');
        }else{
            navigate('/auth/login');
        }
    }

    return(
        <div className='body'>
            <HomePageHeader /> 
            <div className='errorWrapper'>
                <div className='error'>
                    <p className='errorHeader'>404</p>
                    <p className='errorP'>Page not found</p>
                    <button className='goBack' onClick={handleClick}>Back to search</button>
                </div>
            </div>
        </div>
    )
} 

export default NotFound;