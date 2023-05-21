import './HomePage.css'
import HomePageHeader from '../../components/HomePageHeader/HomePageHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import GridHeaders from '../../components/GridHeaders/GridHeaders';
import GridItem from '../../components/GridItem/GridItem';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const HomePage = () => {
    const [dataToDisplay, setDataToDisplay] = useState(false);
    const listItems = useSelector((state: any) => state.listItems)
    return(
        <div className='body'>
            <HomePageHeader />
            <SearchBar onSearch={setDataToDisplay}/>
            <div className='resultsWrapper'>
                {!dataToDisplay && <p className='noDataToDisplayP'>No data to display.<br/> Please start a search to display results.</p>}
                {dataToDisplay && 
                    <div className='dataWrapper'>
                        <GridHeaders />
                        <div className='itemsWrapper'>
                            {listItems.map((item: any, index: number) => (
                                <GridItem item={item} index={index}/>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default HomePage;