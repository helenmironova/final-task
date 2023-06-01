import './HomePage.css'
import HomePageHeader from '../../components/HomePageHeader/HomePageHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import GridHeaders from '../../components/GridHeaders/GridHeaders';
import GridItem from '../../components/GridItem/GridItem';
import {useState, useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { fetchItems} from '../../store/listItems';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { setAnnotationOptions, setProteinWithOptions, setOrganismOptions, setAlreadyFetched } from '../../store/selectorOptions';


const HomePage = () => {
    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

    const selectorOptions = useSelector((state: any) => state.selectorOptions);
    const listItems = useSelector((state: any) => state.listItems.items);
    const nextUrl = useSelector((state: any) => state.listItems.nextUrl);
    const loading = useSelector((state: any) => state.listItems.isLoading);
    const totRes = useSelector((state: any) => state.listItems.totalResults);
    const [dataToDisplay, setDataToDisplay] = useState(false);
    const [isFetching, setIsFetching] = useState(false); // Flag to track data fetching
  
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const prevScrollPosRef = useRef<number>(0);
  
    useEffect(() => {
      if (listItems.length > 0) {
        setDataToDisplay(true);
      }
    }, [listItems]);
  
    useEffect(() => {
      prevScrollPosRef.current = scrollContainerRef.current?.scrollTop || 0;
    });
  
    const handleScroll = () => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;
  
      const { scrollTop, clientHeight, scrollHeight } = scrollContainer;
      const scrolledToBottom = scrollTop + clientHeight >= scrollHeight - 1;
      const prevScrollPos = prevScrollPosRef.current;
  
      if (scrolledToBottom && scrollTop > prevScrollPos && nextUrl !== '' && !isFetching) {
        setIsFetching(true); // Set the flag to true to indicate data fetching is in progress
        dispatch(fetchItems(nextUrl)).then(() => {
          setIsFetching(false); // Reset the flag once data fetching is complete
        });
      }
  
      prevScrollPosRef.current = scrollTop;
    };
  
    let searchText: string = '';
    const searchParams = new URLSearchParams(document.location.search);
    if (searchParams.has('query')) {
      searchText = searchParams.get('query') as string;
    }

      /*
        sends fetch request to get selector options;
        saves data in redux via dispatch;
    */
        const fetchDataSelector = () => {
          fetch(`https://rest.uniprot.org/uniprotkb/search?facets=model_organism,proteins_with,annotation_score&query=(cancer)`)
          .then((response) => response.json())
          .then((data) =>{
              dispatch(setAnnotationOptions(data.facets[2].values));
              dispatch(setOrganismOptions(data.facets[0].values));
              dispatch(setProteinWithOptions(data.facets[1].values));
              dispatch(setAlreadyFetched());
          });
      }
      if (!selectorOptions.alreadyFetched) {
          fetchDataSelector();
      }

    return(
        <div className='body'>
            <HomePageHeader />
            <SearchBar/>
            <div className='resultsWrapper'>
                {!dataToDisplay && <p className='noDataToDisplayP'>No data to display.<br/> Please start a search to display results.</p>}
                {dataToDisplay && 
                    <p className='totResP'>{totRes} Search Results for {searchText}</p>
                }
                {dataToDisplay && <div className='dataWrapper'>
                  <GridHeaders/>
                    <div className='itemsWrapper' onScroll={handleScroll} ref={scrollContainerRef}>
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

