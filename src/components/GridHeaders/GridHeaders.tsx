import {useEffect, useRef} from 'react';
import './GridHeaders.css';
import logo1 from '../../assets/Vector.png';
import logo2 from '../../assets/Vector2.png';
import logo3 from '../../assets/desc.png'
import {useSelector, useDispatch } from 'react-redux';
import { fetchItems, removeItems } from '../../store/listItems';
import { setNewValueSort } from '../../store/sortOptions';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

const GridHeaders = () => {
    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

    //current search text stored in redux;
    const searchText = useSelector((state: any)=>state.searchText);
    //current filter options stored in redux;
    const filterOptions = useSelector((state: any)=> state.filterOptions);
    //current sort options stored in redux;
    const sortOptions = useSelector((state: any)=>state.sortOptions);  

    //given url, returns same url but with current sort querry;
    const addSortType = (url: string) => {
      let sortBy = "";
      let sortType = "";
      if(sortOptions.selected===1){
        sortBy = 'accession';
      }else if(sortOptions.selected===2){
        sortBy = 'id';
      }else if(sortOptions.selected===3){
        sortBy = 'gene';
      }else if(sortOptions.selected===4){
        sortBy = 'organism_name';
      }else if(sortOptions.selected===5){
        sortBy = 'length';
      }
      if(sortOptions.type===0){
        sortType = 'asc';
      }else if(sortOptions.type===1){
        sortType = 'desc';
      }
      url+=`&sort=${sortBy}%20${sortType}`
      return url;
    }

    //given url, returns same url but with current filter querry;
    const addFilter = (url: string) => {
      if(filterOptions.geneName && filterOptions.geneName!=''){
        url+=` AND (gene:${filterOptions.geneName})`;
      }
      if(filterOptions.organism && filterOptions.organism!=''){
          url+= ` AND (model_organism:${filterOptions.organism})`;
      }
      if(filterOptions.sequenceLength__from && filterOptions.sequenceLength__to){
        const from = filterOptions.sequenceLength__from;
        const to = filterOptions.sequenceLength__to;
        url += ` AND (length:%5B${from} TO ${to}%5D)`;
      }
      if(filterOptions.annotationScore && filterOptions.annotationScore!=''){
          url+=` AND (annotation_score:${filterOptions.annotationScore})`;
      }
      if(filterOptions.proteinWith && filterOptions.proteinWith!=''){
          url+=` AND (proteins_with:${filterOptions.proteinWith})`;
      }
      return url;
    }

    //changes sort icon visual on click;
    const changeVisual = (clicked: number) => {
      if(sortOptions.selected===clicked){
        if(sortOptions.type===1) dispatch(setNewValueSort({selected: 0})); //if I clicked on a sorting icon that was sorting desc, selected points to 0 (nothing);
        if(sortOptions.type==0) dispatch(setNewValueSort({type: 1})); //if I clicked on a sorting icon that was sorting asc, sortType changes to type 1 (desc);
      }else{
        dispatch(setNewValueSort({type: 0})); //I clicked on a new sorting icon, sortType becomes 0 (asc);
        dispatch(setNewValueSort({selected: clicked}));
      }
    }

    /*
      if neccessary:
      adds filter querries to url;
      adds sort querries to url;
      removes previous items from redux;
      fetches new items;
    */
    const fetchData = () => {
      let url = `https://rest.uniprot.org/uniprotkb/search?fields=accession,id,gene_names,organism_name,length,ft_peptide,cc_subcellular_location&query=(${(searchText==='' || searchText===null) ? "*" : searchText})`;
        url = addFilter(url);
      if(sortOptions.selected!==0 && sortOptions.selected!==null){
        url = addSortType(url);
      }
      dispatch(removeItems());
      dispatch(fetchItems(url));
    }

    const initialRender = useRef(true);


    //when sorting type changes, fetches new data;
    useEffect(()=>{
      if (initialRender.current) {
        initialRender.current = false;
        return;
      }
      fetchData()}
    , [sortOptions.selected, sortOptions.type]);
  
  return (
    <div className='gridHeaders'>
      <div className='number'>#</div>
      <div className='entry'>
        <p className='entryP'>Entry</p>
        <img src={sortOptions.selected===1 ? (sortOptions.type===0 ? logo2 : logo3) : logo1} className='logo' onClick={()=>changeVisual(1)} />
      </div>
      <div className='entryName'>
        <p className='entryP'>Entry Names</p>
        <img src={sortOptions.selected===2 ? (sortOptions.type===0 ? logo2 : logo3) : logo1} className='logo' onClick={()=>changeVisual(2)} />
      </div>
      <div className='entryName'>
        <p className='entryP'>Genes</p>
        <img src={sortOptions.selected===3 ? (sortOptions.type===0 ? logo2 : logo3) : logo1} className='logo' onClick={()=>changeVisual(3)} />
      </div>
      <div className='entryName'>
        <p className='entryP'>Organism</p>
        <img src={sortOptions.selected===4 ? (sortOptions.type===0 ? logo2 : logo3) : logo1} className='logo' onClick={()=>changeVisual(4)} />
      </div>
      <div className='subcel'>
        <p className='entryP'>Subcellular Location</p>
      </div>
      <div className='length'>
        <p className='entryP'>Length</p>
        <img src={sortOptions.selected===5 ? (sortOptions.type===0 ? logo2 : logo3) : logo1} className='logo' onClick={()=>changeVisual(5)} />
      </div>
    </div>
  );
};

export default GridHeaders;