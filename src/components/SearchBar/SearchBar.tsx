import {useEffect, useState} from 'react';
import {useLocation, useNavigate } from 'react-router-dom';
import './SearchBar.css';
import logo from '../../assets/🦆 icon _Options_.png';
import FilterTab from '../../components/FilterTab/FilterTab';
import { useSelector, useDispatch } from 'react-redux';
import  { setNewValue } from '../../store/filterOptions';
import { setNewSearchText } from '../../store/searchText';
import logoOpened from '../../assets/opened.png'

const SearchBar = (props: any) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchText = useSelector((state: any) => state.searchText);
    const filterOptions = useSelector((state: any) => state.filterOptions);
    const filterPopupIsOpen = useSelector((state: any) => state.filterOptions.isOpen);

    const [dotVisible, setDotVisible] = useState(false);

    /*
        changes url query;
        fetches data (without filter options and grid filter);
    */
    const handleSubmit = (searchText: string) => {
        const query = searchText.trim() || "*";
        navigate(`/search?query=${query}`);      
        const apiUrl = `https://rest.uniprot.org/uniprotkb/search?fields=accession,id,gene_names,organism_name,length,ft_peptide,cc_subcellular_location&query=${query}`;
        props.fetchData(apiUrl, true, true);
    }

    //changes dot visability when filterOptions changes;
    useEffect(()=>{
        for (const value of Object.values(filterOptions)) {
            if (typeof value !== 'boolean' && value !== null && value !== '') {
              setDotVisible(true);
              return;
            }
          }
          
          setDotVisible(false);
          return;
    }, [filterOptions])
 
    //when searchText is changed, new query is added;
    useEffect(() => {
        const searchQuery = searchText.trim() || '*';
        const currentUrl = new URL(window.location.href);
        const params = new URLSearchParams(currentUrl.search);
        params.set('query', searchQuery);
        window.history.replaceState({}, '', `${currentUrl.pathname}?${params}`);
    }, [searchText]);

    //sets new searchText when user changes input value;
    const handleSearchTextChange = (e: any) => {
        const newSearchText = e.target.value;
        dispatch(setNewSearchText(newSearchText));
    };

    /*  
        on location change, changes searchText (dispatch);
        if location has query '*' meaning searchText is empty, searchText becomes an empty string;
    */
    useEffect(() => {
        const searchQuery = new URLSearchParams(location.search).get('query');
        if (searchQuery) {
            if(searchQuery==='*'){
                dispatch(setNewSearchText(""));
                return;
            }
            dispatch(setNewSearchText(searchQuery));
        }
    }, [location]);


    return (
        <div className='searchInputWrapper'>
            <input
                type='text'
                placeholder='Enter search value'
                className='searchInput'
                value={searchText}
                onChange={handleSearchTextChange}
            />
            <button type='submit' className='searchButton' onClick={()=>handleSubmit(searchText)}>
                Search
            </button>
            <button className={filterPopupIsOpen ? 'filter filter-opened' : 'filter'} onClick={()=>dispatch(setNewValue({isOpen: !filterPopupIsOpen}))}>
                {filterPopupIsOpen ? <img src={logoOpened} alt='Filter__opened'></img> : <img src={logo} alt='Filter'/> }
                {dotVisible && <span className='dot'></span>}
            </button>
            {filterPopupIsOpen && <FilterTab fetchData={props.fetchData}/>}
        </div>
    );
};

export default SearchBar;
