import { useState } from 'react';
import './GridHeaders.css';
import logo1 from '../../assets/Vector.png';
import logo2 from '../../assets/Vector2.png';

const GridHeaders = () => {
  const [logo1Src, setLogo1Src] = useState(logo1);
  const [logo2Src, setLogo2Src] = useState(logo1);

  const handleLogo1Click = () => {
    if (logo1Src === logo1) {
      setLogo1Src(logo2);
    } else {
      setLogo1Src(logo1);
    }
  };

  const handleLogo2Click = () => {
    if (logo2Src === logo1) {
      setLogo2Src(logo2);
    } else {
      setLogo2Src(logo1);
    }
  };

  return (
    <div className='gridHeaders'>
      <div className='number'>#</div>
      <div className='entry'>
        <p className='entryP'>Entry</p>
        <img src={logo1Src} className='logo' onClick={handleLogo1Click} />
      </div>
      <div className='entryName'>
        <p className='entryP'>Entry Names</p>
        <img src={logo2Src} className='logo' onClick={handleLogo2Click} />
      </div>
      <div className='entryName'>
        <p className='entryP'>Genes</p>
        <img src={logo1} className='logo' />
      </div>
      <div className='entryName'>
        <p className='entryP'>Organism</p>
        <img src={logo1} className='logo' />
      </div>
      <div className='subcel'>
        <p className='entryP'>Subcellular Location</p>
      </div>
      <div className='length'>
        <p className='entryP'>Length</p>
        <img src={logo1} className='logo' />
      </div>
    </div>
  );
};

export default GridHeaders;