import { useState } from 'react';
import './GridHeaders.css';
import logo1 from '../../assets/Vector.png';
import logo2 from '../../assets/Vector2.png';

const GridHeaders = () => {
    const [selected, setSelected] = useState<number>(0);

    const handleLogoClick = (logoNumber: number) => {
        if(selected===logoNumber){
            setSelected(0);
            return;
        }
        setSelected(logoNumber);
    };
  
  


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