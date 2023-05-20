import './HomePage.css'
import HomePageHeader from '../../components/HomePageHeader/HomePageHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import GridHeaders from '../../components/GridHeaders/GridHeaders';
import { useState } from 'react';

const HomePage = () => {
    const [dataToDisplay, setDataToDisplay] = useState(false);
    // const [data, setData] = useState([]);

    return(
        <div className='body'>
            <HomePageHeader />
            <SearchBar onSearch={setDataToDisplay}/>
            <div className='resultsWrapper'>
                {!dataToDisplay && <p className='noDataToDisplayP'>No data to display.<br/> Please start a search to display results.</p>}
                {dataToDisplay && 
                    <div className='dataWrapper'>
                        <GridHeaders />
                    </div>
                }
            </div>
        </div>
    )
}

export default HomePage;