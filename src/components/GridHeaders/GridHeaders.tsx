import { useEffect, useState } from 'react';
import './GridHeaders.css';
import logo1 from '../../assets/Vector.png';
import logo2 from '../../assets/Vector2.png';
import { useDispatch, useSelector } from 'react-redux';
import { removeItems } from '../../store/listItems';

const GridHeaders = (props: any) => {
    const [selected, setSelected] = useState<number>(0);
    const searchText = useSelector((state: any)=>state.searchText);
    const dispatch = useDispatch();
    const handleLogoClick = (logoNumber: number) => {
        if(selected===logoNumber){
            setSelected(0);
            return;
        }
        setSelected(logoNumber);
    };
  
  useEffect(()=>{
    let url = `https://rest.uniprot.org/uniprotkb/search?fields=accession,id,gene_names,organism_name,length,ft_peptide,cc_subcellular_location&query=(${searchText})`;
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
    if(sortType==='') return;
    url = `https://rest.uniprot.org/uniprotkb/search?fields=accession,id,gene_names,organism_name,length,ft_peptide,cc_subcellular_location&query=(${searchText})&sort=${sortType}%20asc`;
    dispatch(removeItems());
    props.fetchData(url);

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