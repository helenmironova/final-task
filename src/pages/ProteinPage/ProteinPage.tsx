import { useDispatch, useSelector } from 'react-redux';
import HomePageHeader from '../../components/HomePageHeader/HomePageHeader';
import './ProteinPage.css';
import { useLocation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProteinData, fetchProteinReferencesData } from '../../store/selectedProtein';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import BasicData from '../../components/BasicData/BasicData';
import Paths from '../../components/Paths/Paths';
import DetailsTab from '../../components/DetailsTab/DetailsTab';
import PublicationsTab from '../../components/PublicationsTab/PublicationsTab';

const ProteinPage = () => {
    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
    const location = useLocation();
    const protein = useSelector((state: any) => state.selectedProtein);
    
    const [tab, setTab] = useState('details'); //details || feature || publications

    useEffect(() => {
        dispatch(fetchProteinData(protein.name));
        dispatch(fetchProteinReferencesData(protein.name));
    }, [dispatch]);

    useEffect(() => {
        const currentUrl = new URL(window.location.href);
        const params = new URLSearchParams(currentUrl.search);
        params.set('protein', protein.name);
        window.history.replaceState({}, '', `${currentUrl.pathname}?${params}`);
    }, [location, protein.name]);

    return (
        <div className='body'>
        <HomePageHeader />
        <div className='proteinDataWrapper'>
            <BasicData protein={protein.protein} />
            <Paths tab={tab} setTab={setTab}/>
            {/* Render content based on the selected tab */}
            <div className='content'>
                {tab === 'details' && <DetailsTab/>}
                {tab === 'feature' && <div>Feature Viewer Content</div>}
                {tab === 'publications' && <PublicationsTab />}
            </div>
        </div>
        </div>
    );
};

export default ProteinPage;
