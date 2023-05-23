import { useState, useEffect } from 'react';
import {useLocation } from 'react-router-dom';
import './SearchBar.css';
import logo from '../../assets/🦆 icon _Options_.png';


const SearchBar = (props: any) => {
    const location = useLocation();
    const [searchText, setSearchText] = useState('');

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
            <button className='filter'>
                <img src={logo} alt='Filter' />
            </button>
        </div>
    );
};

export default SearchBar;
