import {useEffect, useState} from 'react';
import {useLocation } from 'react-router-dom';
import './SearchBar.css';
import logo from '../../assets/🦆 icon _Options_.png';
import FilterTab from '../../components/FilterTab/FilterTab';
import { useSelector, useDispatch } from 'react-redux';
import filterOptions, { setNewValue } from '../../store/filterOptions';
import { setNewSearchText } from '../../store/searchText';
import logoOpened from '../../assets/opened.png'

const SearchBar = (props: any) => {
    const location = useLocation();
    const searchText = useSelector((state: any) => state.searchText);
    const dispatch = useDispatch();
    const [dotVisible, setDotVisible] = useState(false);
    const filterOptions = useSelector((state: any) => state.filterOptions);

    const hasFilters = () => {        
        for (const value of Object.values(filterOptions)) {
            if (typeof value !== 'boolean' && value !== null && value !== '') {
              setDotVisible(true);
              return;
            }
          }
          
          setDotVisible(false);
          return;
    } 

    useEffect(()=>{
        hasFilters();
    }, [filterOptions])


    const setSearchText = (newText: any) => {
        dispatch(setNewSearchText(newText));
    };

    const filterPopupIsOpen = useSelector((state: any) => state.filterOptions.isOpen);
    /*
        when searchText is changed, new query is added;
    */
    useEffect(() => {
        const searchQuery = searchText.trim() || '*';
        const currentUrl = new URL(window.location.href);
        const params = new URLSearchParams(currentUrl.search);
        params.set('query', searchQuery);
        window.history.replaceState({}, '', `${currentUrl.pathname}?${params}`);
    }, [searchText]);

    /*
        sets new searchText when user changes input value;
    */
    const handleSearchTextChange = (e: any) => {
        const newSearchText = e.target.value;
        setSearchText(newSearchText);
    };

    /*
        on location change, changes searchText;
        if location has query '*' meaning searchText is empty, searchText becomes an empty string;
    */
    useEffect(() => {
        const searchQuery = new URLSearchParams(location.search).get('query');
        if (searchQuery) {
            if(searchQuery==='*'){
                setSearchText("");
                return;
            }
            setSearchText(searchQuery);
        }
    }, [location]);


    /*
        handles filter icon click;
        conditionaly renders filter popup;
    */
    const handleFilterClick = () => {
        dispatch(setNewValue({isOpen: !filterPopupIsOpen}));
    }

    


    return (
        <div className='searchInputWrapper'>
            <input
                type='text'
                placeholder='Enter search value'
                className='searchInput'
                value={searchText}
                onChange={handleSearchTextChange}
            />
            <button type='submit' className='searchButton' onClick={()=>props.handleSubmit(searchText)}>
                Search
            </button>
            <button className={filterPopupIsOpen ? 'filter filter-opened' : 'filter'} onClick={handleFilterClick}>
                {filterPopupIsOpen ? <img src={logoOpened} alt='Filter__opened'></img> : <img src={logo} alt='Filter'/> }
                {dotVisible && <span className='dot'></span>}
            </button>
            {filterPopupIsOpen && <FilterTab fetchData={props.fetchData} searchText={searchText}/>}
        </div>
    );
};

export default SearchBar;
