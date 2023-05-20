import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';
import logo from '../../assets/🦆 icon _Options_.png';

const SearchBar = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const searchQuery = searchText.trim() || '*';
        navigate(`/search?query=${searchQuery}`);
    }, [searchText, navigate]);

    const handleSearchTextChange = (e: any) => {
        const newSearchText = e.target.value;
        setSearchText(newSearchText);
    };

    return (
        <div className='searchInputWrapper'>
            <input
                type='text'
                placeholder='Enter search value'
                className='searchInput'
                value={searchText}
                onChange={handleSearchTextChange}
            />
            <button type='submit' className='searchButton'>
                Search
            </button>
            <button className='filter'>
                <img src={logo} alt='Filter' />
            </button>
        </div>
    );
};

export default SearchBar;
