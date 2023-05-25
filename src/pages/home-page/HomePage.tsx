import './HomePage.css'
import HomePageHeader from '../../components/HomePageHeader/HomePageHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import GridHeaders from '../../components/GridHeaders/GridHeaders';
import GridItem from '../../components/GridItem/GridItem';
import {useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { fetchItems} from '../../store/listItems';
import { removeItems } from '../../store/listItems';
import { setNewValue } from '../../store/filterOptions';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const HomePage = () => {
    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

    const listItems = useSelector((state: any) => state.listItems.items);
    const nextUrl = useSelector((state: any) => state.listItems.nextUrl);
    const loading = useSelector((state: any) => state.listItems.isLoading)
    
    const [dataToDisplay, setDataToDisplay] = useState(false);
    const [selected, setSelected] = useState(0);

    /*
        fethes data from given url;
        sets nextUrl to appropriate url;
        dispatches new items;
    */
    const fetchData = (url: string, removeFilterOptions: boolean, removeGridFilter: boolean, removePreviousItems: boolean) => {
        dispatch(setNewValue({isOpen: false}))
  
        const removeFilters = () => {
          dispatch(setNewValue({
            geneName: null,
            organism: null,
            sequenceLength__from: null,
            sequenceLength__to: null,
            annotationScore: null,
            proteinWith: null
          }));
                   
        }
        if(removeFilterOptions) removeFilters();
        if(removeGridFilter) setSelected(0);
        if(removePreviousItems) dispatch(removeItems());
        setDataToDisplay(true);
        dispatch(fetchItems(url));
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
            fetchData(nextUrl, false, false, false);
        }
    }

    return(
        <div className='body'>
            <HomePageHeader />
            <SearchBar fetchData={fetchData}/>
            <div className='resultsWrapper'>
                {/* {!dataToDisplay && <p className='noDataToDisplayP'>No data to display.<br/> Please start a search to display results.</p>} */}
                <div className='dataWrapper'>
                  <GridHeaders fetchData={fetchData} selected={selected} setSelected={setSelected}/>
                    <div className='itemsWrapper' onScroll={handleScroll}>
                        {listItems?.map((item: any, index: number) => (
                            <GridItem item={item} index={index} key={uuidv4()}/>
                        ))}
                    </div>
                    {loading && <div className='loadingWrapper'>Loading...</div>}
                </div>
            </div>
        </div>
    )
}

export default HomePage;