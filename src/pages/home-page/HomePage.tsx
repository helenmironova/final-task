import './HomePage.css'
import HomePageHeader from '../../components/HomePageHeader/HomePageHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import GridHeaders from '../../components/GridHeaders/GridHeaders';
import GridItem from '../../components/GridItem/GridItem';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router';
import { addListItems } from '../../store/listItems';


const HomePage = () => {
    const [dataToDisplay, setDataToDisplay] = useState(false);
    const listItems = useSelector((state: any) => state.listItems)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleSubmit = (searchText: string) => {
        const query = searchText.trim() || '*';
        navigate(`/search?query=${query}`);

        fetch(`https://rest.uniprot.org/uniprotkb/search?fields=accession,id,gene_names,organism_name,length,ft_peptide,cc_subcellular_location&query=$Cancer`)
        .then((response) => {
          console.log(response);
          console.log(response.headers.get("Link"))
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setDataToDisplay(true);
          dispatch(addListItems(data.results));
        })
        .catch((error) => {
          console.error(error);
        });
    };

    return(
        <div className='body'>
            <HomePageHeader />
            <SearchBar handleSubmit={handleSubmit}/>
            <div className='resultsWrapper'>
                {!dataToDisplay && <p className='noDataToDisplayP'>No data to display.<br/> Please start a search to display results.</p>}
                {dataToDisplay && 
                    <div className='dataWrapper'>
                        <div className='itemsWrapper'>
                            <GridHeaders />
                            {listItems.map((item: any, index: number) => (
                                <GridItem item={item} index={index} key={uuidv4()}/>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default HomePage;