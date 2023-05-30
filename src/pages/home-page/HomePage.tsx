import './HomePage.css'
import HomePageHeader from '../../components/HomePageHeader/HomePageHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import GridHeaders from '../../components/GridHeaders/GridHeaders';
import GridItem from '../../components/GridItem/GridItem';
import {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { fetchItems} from '../../store/listItems';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const HomePage = () => {
    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

    //holds list of proteins that must be displaied in table;
    const listItems = useSelector((state: any) => state.listItems.items);
    //holds url for next chunk of items that will be fetched;
    const nextUrl = useSelector((state: any) => state.listItems.nextUrl);
    //determines if items are fetched or not;
    const loading = useSelector((state: any) => state.listItems.isLoading);
    //determines if there is data to be displaied;
    const [dataToDisplay, setDataToDisplay] = useState(false);

    /*
        when listItems change:
        if api returned some items: data must be displaied;
    */
    useEffect(()=>{
        if(listItems.length>0){
            setDataToDisplay(true);
        }
    }, [listItems])

    /*
        detects when user scrolles to the end of itemsWrapper div;
        then fetches new data, if nextUrl is not an empty string;
    */
    const handleScroll = (e: any) => {
        const { scrollTop, clientHeight, scrollHeight } = e.target;
        const scrolledToBottom = scrollTop + clientHeight >= scrollHeight - 1;
        if (scrolledToBottom && nextUrl!='') {
            dispatch(fetchItems(nextUrl));
        }
    }

    return(
        <div className='body'>
            <HomePageHeader />
            <SearchBar/>
            <div className='resultsWrapper'>
                {!dataToDisplay && <p className='noDataToDisplayP'>No data to display.<br/> Please start a search to display results.</p>}
                {dataToDisplay && <div className='dataWrapper'>
                  <GridHeaders/>
                    <div className='itemsWrapper' onScroll={handleScroll}>
                        {listItems?.map((item: any, index: number) => (
                            <GridItem item={item} index={index} key={uuidv4()}/>
                        ))}
                    </div>
                    {loading && <div className='loadingWrapper'>Loading...</div>}
                </div>}
            </div>
        </div>
    )
}

export default HomePage;

