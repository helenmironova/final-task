import { v4 as uuidv4 } from 'uuid';
import './GridItem.css'
import {useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNewSelectedProteinName } from '../../store/selectedProtein';

const GridItem = (props: any) => {   
    const dispatch = useDispatch();

    const [locations, setLocations] = useState<string[]>([]);

    if (props.item.comments && props.item.comments.length > 0) {
        if(props.item.comments[0].subcellularLocations && props.item.comments[0].subcellularLocations.length>0){
            props.item.comments[0].subcellularLocations.forEach((loc: any) => {
                if (!locations.includes(loc.location.value)) {
                    setLocations(prevLocations => [...prevLocations, loc.location.value]);
                }
            });   
        }
    }

    function formatArray(array: string[]): string {
        const words: string[] = [];
      
        for (const element of array) {
          words.push(...element.split(',').map(word => word.trim()));
        }
      
        if (words.length <= 2) {
          return words.join(', ');
        }
      
        return words.slice(0, 2).join(', ') + ', ...';
    }

    const handleLinkClick = () => {
        dispatch(setNewSelectedProteinName(props.item.primaryAccession));
    };

    return(
        <div className='itemWrapper'>
            <div className='numberDiv'>{props.index+1}</div>
            <div className='entryDiv'><Link to={"/protein"} onClick={handleLinkClick} >{props.item.primaryAccession}</Link></div>
            <div className='entryNameDiv'>{props.item.uniProtkbId}</div>
            <div className='genesDiv'>
                {props.item.genes?.map((gene: any) => (
                    <span key={uuidv4()} className='span'>
                        <b>{gene.geneName?.value}</b>
                        {gene.synonyms && gene.synonyms.length > 0 && (
                            <>
                            {', '}
                            {gene.synonyms.map((synonym: any, index: number) => (
                                <span key={uuidv4()}>
                                {synonym.value}
                                {index !== gene.synonyms.length - 1 && ', '}
                                </span>
                            ))}
                            </>
                        )}
                    </span>
                ))}
            </div>
            <div className='organismDiv'><div className='organismInsideDiv'>{props.item.organism.scientificName}</div></div>
            <div className='subcelDiv'>{formatArray(locations)}</div>
            <div className='lengthDiv'>{props.item.sequence.length}</div>
        </div>
    )
}

export default GridItem;