import './HomePage.css'
import HomePageHeader from '../../components/HomePageHeader/HomePageHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import GridHeaders from '../../components/GridHeaders/GridHeaders';
import GridItem from '../../components/GridItem/GridItem';
import {useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addListItems } from '../../store/listItems';
import { removeItems } from '../../store/listItems';
import { setNewSelected } from '../../store/selected';
import { setNewValue } from '../../store/filterOptions';

const HomePage = () => {
    const [dataToDisplay, setDataToDisplay] = useState(false);
    const listItems = useSelector((state: any) => state.listItems);
    const dispatch = useDispatch()
    const [nextUrl, setNextUrl] = useState<string>("");
    const [fetching, setFetching] = useState(false);

    /*
        fethes data from given url;
        sets nextUrl to appropriate url;
        dispatches new items;
    */
    const fetchData = (url: string, removeFilterOptions: boolean, removeGridFilter: boolean, removePreviousItems: boolean) => {
        dispatch(setNewValue({isOpen: false}))
  
        
        //given link header returns it as url;
        const parseNextLink = (linkHeader: string | null): string | null => {
            if (linkHeader) {
              const links = linkHeader.split(", ");
              for (const link of links) {
                const [url, rel] = link.split("; ");
                if (rel === 'rel="next"') {
                  return url.slice(1, -1); // Remove the angle brackets around the URL
                }
              }
            }
            return null;
        };
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
        if(removeGridFilter) dispatch(setNewSelected(0));
        if(removePreviousItems) dispatch(removeItems());

        setFetching(true);
        fetch(url)
          .then((response) => {
            const linkHeader = response.headers.get("Link");
            const nextUrl = parseNextLink(linkHeader);
            return Promise.all([response.json(), nextUrl]);
          })
          .then(([data, nextUrl]) => {
            const newItems = data.results;
            setDataToDisplay(true);
            setNextUrl(nextUrl || '');
            dispatch(addListItems(newItems));
          })
          .catch((error) => {
            console.error(error);
          }) 
          .finally(() => {
            setTimeout(() => {
              setFetching(false);
            }, 200);
          });
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
                {!dataToDisplay && <p className='noDataToDisplayP'>No data to display.<br/> Please start a search to display results.</p>}
                {dataToDisplay && 
                    <div className='dataWrapper'>
                      <GridHeaders fetchData={fetchData}/>
                        <div className='itemsWrapper' onScroll={handleScroll}>
                            {listItems.map((item: any, index: number) => (
                                <GridItem item={item} index={index} key={uuidv4()}/>
                            ))}
                        </div>
                    </div>
                }
            </div>

            {fetching && <div className='fetchingWrapper'>Loading...</div>}
        </div>
    )
}

export default HomePage;