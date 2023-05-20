import './SearchBar.css'

const SearchBar = () => {
    return(
        <div className='searchInputWrapper'>
            <input type='text' placeholder='Enter search value' className='searchInput'></input>
            <button type='submit' className='searchButton'>Search</button>
        </div>
    )
}

export default SearchBar;