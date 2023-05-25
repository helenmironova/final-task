import SequenceData from '../../components/SequenceData/SequenceData';
import './DetailsTab.css'
import copyImage from '../../assets/copy.png'
import { useSelector } from 'react-redux';
import { useRef } from 'react';
const DetailsTab = () => {
    const paragraphRef = useRef<HTMLParagraphElement>(null);

  const handleCopyClick = () => {
    if (paragraphRef.current) {
      const paragraphText = paragraphRef.current.innerText;
      navigator.clipboard.writeText(paragraphText);
    }
  };

    const protein = useSelector((state: any) => state.selectedProtein.protein);
    return(
        <div className='detailsTab'>
            <SequenceData />
            <div className='sequenceItselfWrapper'>
                <div className='imgWrapper' onClick={handleCopyClick}><img src={copyImage}/>Copy</div>
                <div className='sequenceItself' ref={paragraphRef}>
                    {protein?.sequence?.value}
                </div>
            </div>
        </div>
    )
}

export default DetailsTab;