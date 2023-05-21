import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SearchBar.css';
import logo from '../../assets/🦆 icon _Options_.png';
import { useDispatch} from 'react-redux';
import { addListItems } from '../../store/listItems';

const SearchBar = (props: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
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


    const handleSubmit = () => {
        const query = searchText.trim() || '*';
        navigate(`/search?query=${query}`);

        fetch(`https://rest.uniprot.org/uniprotkb/search?fields=accession,id,gene_names,organism_name,length,ft_peptide,cc_subcellular_location&query=(${query})&size=25`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                props.onSearch(true);
                dispatch(addListItems(data.results));
            })
            .catch((error) => {
                console.error(error);
            });
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
            <button type='submit' className='searchButton' onClick={handleSubmit}>
                Search
            </button>
            <button className='filter'>
                <img src={logo} alt='Filter' />
            </button>
        </div>
    );
};

export default SearchBar;
