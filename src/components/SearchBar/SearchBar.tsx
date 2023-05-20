import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';
import logo from '../../assets/🦆 icon _Options_.png';

const SearchBar = (props: any) => {
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

    const handleSubmit = () => {
        const query = searchText.trim() || '*';
        fetch(`https://rest.uniprot.org/uniprotkb/search?fields=accession,id,gene_names,organism_name,length,cc_subcellular_location&query=${query}`)
        .then((response) => {
            if (response.ok) {
            return response.json();
            }
            throw new Error('Request failed');
        })
        .then((data) => {
            console.log(data);
            props.onSearch(true);
        })
        .catch((error) => {
            console.error(error);
        });
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
            <button type='submit' className='searchButton' onClick={()=>handleSubmit()}>
                Search
            </button>
            <button className='filter'>
                <img src={logo} alt='Filter' />
            </button>
        </div>
    );
};

export default SearchBar;
