import { useEffect} from 'react';
import './GridHeaders.css';
import logo1 from '../../assets/Vector.png';
import logo2 from '../../assets/Vector2.png';
import { useDispatch, useSelector } from 'react-redux';
import { removeItems } from '../../store/listItems';
import { setNewSelected } from '../../store/selected';

const GridHeaders = (props: any) => {
    const selected = useSelector((state: any) => state.selected);
    const searchText = useSelector((state: any)=>state.searchText);
    const filterOptions = useSelector((state: any)=> state.filterOptions)
    const dispatch = useDispatch();

    const setSelected = (newNum: any) => {
      dispatch(setNewSelected(newNum));
    }

    const handleLogoClick = (logoNumber: number) => {
        if(selected===logoNumber){
            setSelected(0);
            return;
        }
        setSelected(logoNumber);
    };
  
  /*
    adds filter queries to url;
    adds sort queries to url;
    removes previous items (dispatch);
    fetches data;
  */
  useEffect(()=>{
    const addSortType = (url: string) => {
      if(selected===0){
        dispatch(removeItems());
        props.fetchData(url);
      }  
      let sortType = "";
      if(selected===1){
        sortType = 'accession';
      }else if(selected===2){
        sortType = 'id';
      }else if(selected===3){
        sortType = 'gene';
      }else if(selected===4){
        sortType = 'organism_name';
      }else if(selected===5){
        sortType = 'length';
      }
      if(sortType==='') return url;
      url+=`&sort=${sortType}%20asc`
      return url;
    }
    const addFilter = (url: string) => {
      if(filterOptions.geneName && filterOptions.geneName!=''){
        url+=` AND (gene:${filterOptions.geneName})`;
      }
      if(filterOptions.organism && filterOptions.organism!=''){
          url+= ` AND (model_organism:${filterOptions.organism})`;
      }
      if(filterOptions.sequenceLength__from && filterOptions.sequenceLength__to){
          url+= ` AND (length:[${filterOptions.sequenceLength__from} TO ${filterOptions.sequenceLength__to}])`;
      }
      if(filterOptions.annotationScore && filterOptions.annotationScore!=''){
          url+=` AND (annotation_score:${filterOptions.annotationScore})`;
      }
      if(filterOptions.proteinWith && filterOptions.proteinWith!=''){
          url+=` AND (proteins_with:${filterOptions.proteinWith})`;
      }
      return url;
    }

    let url = `https://rest.uniprot.org/uniprotkb/search?fields=accession,id,gene_names,organism_name,length,ft_peptide,cc_subcellular_location&query=(${(searchText==='' || searchText===null) ? "*" : searchText})`;
    url = addFilter(url);
    url = addSortType(url);
    props.fetchData(url, false, false, true);

  }, [selected])


  return (
    <div className='gridHeaders'>
      <div className='number'>#</div>
      <div className='entry'>
        <p className='entryP'>Entry</p>
        <img src={selected===1 ? logo2 : logo1} className='logo' onClick={()=>handleLogoClick(1)} />
      </div>
      <div className='entryName'>
        <p className='entryP'>Entry Names</p>
        <img src={selected===2 ? logo2 : logo1} className='logo' onClick={()=>handleLogoClick(2)} />
      </div>
      <div className='entryName'>
        <p className='entryP'>Genes</p>
        <img src={selected===3 ? logo2 : logo1} className='logo' onClick={()=>handleLogoClick(3)} />
      </div>
      <div className='entryName'>
        <p className='entryP'>Organism</p>
        <img src={selected===4 ? logo2 : logo1} className='logo' onClick={()=>handleLogoClick(4)} />
      </div>
      <div className='subcel'>
        <p className='entryP'>Subcellular Location</p>
      </div>
      <div className='length'>
        <p className='entryP'>Length</p>
        <img src={selected===5 ? logo2 : logo1} className='logo' onClick={()=>handleLogoClick(5)} />
      </div>
    </div>
  );
};

export default GridHeaders;