import './HomePage.css'
import HomePageHeader from '../../components/HomePageHeader/HomePageHeader';
import SearchBar from '../../components/SearchBar/SearchBar';

const HomePage = () => {
    return(
        <div className='body'>
            <HomePageHeader />
            <SearchBar />
        </div>
    )
}

export default HomePage;