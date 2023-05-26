import {useState, useEffect} from 'react';
import './GridHeaders.css';
import logo1 from '../../assets/Vector.png';
import logo2 from '../../assets/Vector2.png';
import logo3 from '../../assets/desc.png'
import {useSelector } from 'react-redux';

const GridHeaders = (props: any) => {
    const searchText = useSelector((state: any)=>state.searchText);
    const filterOptions = useSelector((state: any)=> state.filterOptions)

    const [selected, setSelected] = useState(0);
    const [type, setType] = useState(0);

    const addSortType = (url: string) => {
      console.log(url)
      let sortBy = "";
      let sortType = "";
      if(selected===1){
        sortBy = 'accession';
      }else if(selected===2){
        sortBy = 'id';
      }else if(selected===3){
        sortBy = 'gene';
      }else if(selected===4){
        sortBy = 'organism_name';
      }else if(selected===5){
        sortBy = 'length';
      }
      if(type===0){
        sortType = 'asc';
      }else if(type===1){
        sortType = 'desc';
      }
      url+=`&sort=${sortBy}%20${sortType}`
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

    const changeVisual = (clicked: number) => {
      if(selected===clicked){
        if(type===1) setSelected(0); //if I clicked on a sorting icon that was sorting desc, selected points to 0 (nothing);
        if(type==0) setType(1); //if I clicked on a sorting icon that was sorting asc, sortType changes to type 1 (desc);
      }else{
        setType(0); //I clicked on a new sorting icon, sortType becomes 0 (asc);
        setSelected(clicked);
      }
    }

    const fetchData = () => {
      let url = `https://rest.uniprot.org/uniprotkb/search?fields=accession,id,gene_names,organism_name,length,ft_peptide,cc_subcellular_location&query=(${(searchText==='' || searchText===null) ? "*" : searchText})`;
      if(selected!==0){
        url = addFilter(url);
        url = addSortType(url);
      }
      props.fetchData(url, false, true);
    }

    //handles logo click:
    //changes img visual;
    const handleLogoClick = (clicked: number) => {
        changeVisual(clicked);
    };

    //when selected sorting tag or sort type changes, fetches new Data;
    useEffect(()=>fetchData(), [selected, type]);
  
  return (
    <div className='gridHeaders'>
      <div className='number'>#</div>
      <div className='entry'>
        <p className='entryP'>Entry</p>
        <img src={selected===1 ? (type===0 ? logo2 : logo3) : logo1} className='logo' onClick={()=>handleLogoClick(1)} />
      </div>
      <div className='entryName'>
        <p className='entryP'>Entry Names</p>
        <img src={selected===2 ? (type===0 ? logo2 : logo3) : logo1} className='logo' onClick={()=>handleLogoClick(2)} />
      </div>
      <div className='entryName'>
        <p className='entryP'>Genes</p>
        <img src={selected===3 ? (type===0 ? logo2 : logo3) : logo1} className='logo' onClick={()=>handleLogoClick(3)} />
      </div>
      <div className='entryName'>
        <p className='entryP'>Organism</p>
        <img src={selected===4 ? (type===0 ? logo2 : logo3) : logo1} className='logo' onClick={()=>handleLogoClick(4)} />
      </div>
      <div className='subcel'>
        <p className='entryP'>Subcellular Location</p>
      </div>
      <div className='length'>
        <p className='entryP'>Length</p>
        <img src={selected===5 ? (type===0 ? logo2 : logo3) : logo1} className='logo' onClick={()=>handleLogoClick(5)} />
      </div>
    </div>
  );
};

export default GridHeaders;