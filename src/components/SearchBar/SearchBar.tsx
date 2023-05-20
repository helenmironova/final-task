import './SearchBar.css'
import logo from '../../assets/🦆 icon _Options_.png'

const SearchBar = () => {
    return(
        <div className='searchInputWrapper'>
            <input type='text' placeholder='Enter search value' className='searchInput'></input>
            <button type='submit' className='searchButton'>Search</button>
            <button className='filter'><img src={logo}></img></button>
        </div>
    )
}

export default SearchBar;