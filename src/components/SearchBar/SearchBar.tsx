import {useEffect, useState} from 'react';
import {useLocation, useNavigate } from 'react-router-dom';
import './SearchBar.css';
import logo from '../../assets/🦆 icon _Options_.png';
import FilterTab from '../../components/FilterTab/FilterTab';
import { useSelector, useDispatch } from 'react-redux';
import  { setNewValueFilter } from '../../store/filterOptions';
import { setNewSearchText } from '../../store/searchText';
import logoOpened from '../../assets/opened.png'
import { fetchItems, removeItems } from '../../store/listItems';
import { setNewValueSort } from '../../store/sortOptions';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

const SearchBar = () => {
    const location = useLocation();
    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state: any)=>state.user);
    if(user===null || user===""){
        navigate('/not-found');
    } 


    //search text stored in redux;
    const searchText = useSelector((state: any) => state.searchText);
    //filters stord in redux;
    const filterOptions = useSelector((state: any) => state.filterOptions);
    //determines if little dot above the filters button should be visible;
    const [dotVisible, setDotVisible] = useState(false);

    /*
        changes url query;
        removes previous list items stored in redux;
        sets filter options to no options (default);
        sets sorting options to no sort (default);
        fetches new data;
    */
    const handleSubmit = (searchText: string) => { 
        const apiUrl = `https://rest.uniprot.org/uniprotkb/search?fields=accession,id,gene_names,organism_name,length,ft_peptide,cc_subcellular_location&query=${(searchText==='' || searchText===null) ? "*" : searchText }`;
        dispatch(removeItems());
        dispatch(setNewValueFilter({
            isOpen: false,
            geneName: null,
            organism: null,
            sequenceLength__from: null,
            sequenceLength__to: null, 
            annotationScore: null,
            proteinWith: null,
        }));
        dispatch(setNewValueSort({selected: 0, type: 0}))
        dispatch(fetchItems(apiUrl));
        const button = document.getElementsByClassName("searchButton")[0] as HTMLInputElement;
        button.blur();
    }

    /*
        when filter option changes checks if there are any filters
        if yes: sets little dot visible;
        else not;
    */
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
 
    //when searchText is changed, new query is added to url;
    useEffect(() => {
        const searchQuery = searchText.trim() || '*';
        const currentUrl = new URL(window.location.href);
        const params = new URLSearchParams(currentUrl.search);
        params.set('query', searchQuery);
        window.history.replaceState({}, '', `${currentUrl.pathname}?${params}`);
    }, [searchText]);

    //sets new searchText (in redux) when user changes input value;
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
            }else{
                dispatch(setNewSearchText(searchQuery));
            }
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
                name='search'
                autoComplete='off'
            />
            <button type='submit' className='searchButton' onClick={()=>handleSubmit(searchText)}>
                Search
            </button>
            <button className={filterOptions.isOpen ? 'filter filter-opened' : 'filter'} onClick={()=>dispatch(setNewValueFilter({isOpen: !filterOptions.isOpen}))}>
                {filterOptions.isOpen ? <img src={logoOpened} alt='Filter__opened'></img> : <img src={logo} alt='Filter'/> }
                {dotVisible && <span className='dot'></span>}
            </button>
            {filterOptions.isOpen && <FilterTab/>}
        </div>
    );
};

export default SearchBar;
