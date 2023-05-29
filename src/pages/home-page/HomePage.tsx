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

    const listItems = useSelector((state: any) => state.listItems.items);
    const nextUrl = useSelector((state: any) => state.listItems.nextUrl);
    const loading = useSelector((state: any) => state.listItems.isLoading);
    
    const [dataToDisplay, setDataToDisplay] = useState(false);

    useEffect(()=>{
        if(listItems.length>0){
            setDataToDisplay(true)
        }
    }, [listItems])

    /*
        fethes data from given url;
        sets nextUrl to appropriate url;
        dispatches new items;
    */
    const fetchData = (url: string) => {
        dispatch(fetchItems(url));
        setDataToDisplay(true);
    };

    /*
        detects when user scrolles to the end of itemsWrapper div;
        then fetches new data, if nextUrl is not an empty string;
        removes selected results filter;
    */
    const handleScroll = (e: any) => {
        const { scrollTop, clientHeight, scrollHeight } = e.target;
        const scrolledToBottom = scrollTop + clientHeight >= scrollHeight - 1;
        if (scrolledToBottom && nextUrl!='') {
            fetchData(nextUrl);
        }
    }

    return(
        <div className='body'>
            <HomePageHeader />
            <SearchBar fetchData={fetchData}/>
            <div className='resultsWrapper'>
                {!dataToDisplay && <p className='noDataToDisplayP'>No data to display.<br/> Please start a search to display results.</p>}
                {dataToDisplay && <div className='dataWrapper'>
                  <GridHeaders fetchData={fetchData}/>
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

