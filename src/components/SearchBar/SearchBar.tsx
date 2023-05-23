import { useState, useEffect } from 'react';
import {useLocation } from 'react-router-dom';
import './SearchBar.css';
import logo from '../../assets/🦆 icon _Options_.png';


const SearchBar = (props: any) => {
    const location = useLocation();
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const searchQuery = searchText.trim() || '*';
        const currentUrl = new URL(window.location.href);
        const params = new URLSearchParams(currentUrl.search);
        params.set('query', searchQuery);
        window.history.replaceState({}, '', `${currentUrl.pathname}?${params}`);
    }, [searchText]);

    const handleSearchTextChange = (e: any) => {
        const newSearchText = e.target.value;
        setSearchText(newSearchText);
    };

    useEffect(() => {
        const searchQuery = new URLSearchParams(location.search).get('query');
        if (searchQuery) {
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
