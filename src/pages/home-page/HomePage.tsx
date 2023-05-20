import './HomePage.css'
import HomePageHeader from '../../components/HomePageHeader/HomePageHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useState } from 'react';

const HomePage = () => {
    const [dataToDisplay, setDataToDisplay] = useState(false);


    return(
        <div className='body'>
            <HomePageHeader />
            <SearchBar onSearch={setDataToDisplay}/>
            <div className='resultsWrapper'>
                {!dataToDisplay && <p className='noDataToDisplayP'>No data to display.<br/> Please start a search to display results.</p>}
            </div>
        </div>
    )
}

export default HomePage;