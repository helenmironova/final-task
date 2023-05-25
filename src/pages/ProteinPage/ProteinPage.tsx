import { useSelector } from 'react-redux';
import HomePageHeader from '../../components/HomePageHeader/HomePageHeader';
import './ProteinPage.css'
import { useLocation } from 'react-router';
import { useEffect } from 'react';

const ProteinPage = () => {
    const location = useLocation();

    const selectedProtein = useSelector((state: any)=>state.selectedProtein);

    useEffect(() => {
        const currentUrl = new URL(window.location.href);
        const params = new URLSearchParams(currentUrl.search);
        params.set('protein', selectedProtein);
        window.history.replaceState({}, '', `${currentUrl.pathname}?${params}`);
    }, [selectedProtein, location]);

    return(
        <div className='body'>
            <HomePageHeader />
            <div className='proteinDataWrapper'>

            </div>
        </div>
    )
}

export default ProteinPage;