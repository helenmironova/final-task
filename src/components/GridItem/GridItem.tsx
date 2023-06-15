import { v4 as uuidv4 } from 'uuid';
import './GridItem.css'
import {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProteinData, fetchProteinReferencesData, setNewSelectedProteinName, setProteinLoading } from '../../store/selectedProtein';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const GridItem = (props: any) => {   
    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

    const [locations, setLocations] = useState<string[]>([]);
    const [dataLoaded, setDataLoaded] = useState(false); // Track whether data has loaded

     /*
        when user clicks link item:
        clicked protein name becomes selected (in redux);
        selected protein's data gets fetched;
        selected protein's references data gets fetched;
    */
    const handleLinkClick = () => {
            dispatch(setNewSelectedProteinName(props.item.primaryAccession));
            dispatch(setProteinLoading(true));
            dispatch(fetchProteinData(props.item.primaryAccession));
            dispatch(fetchProteinReferencesData(props.item.primaryAccession));
    };


    //below functions make subcellular locations data ready to be displaied;
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

    const resetLocations = () => {
        if (props.item.comments && props.item.comments.length > 0) {
            props.item.comments.forEach((comment: any) => {
              if (comment.commentType === 'SUBCELLULAR LOCATION' && comment.subcellularLocations && comment.subcellularLocations.length > 0) {
                comment.subcellularLocations.forEach((loc: any) => {
                  if (!locations.includes(loc.location.value)) {
                    setLocations((prevLocations) => [...prevLocations, loc.location.value]);
                  }
                });
              }
            });
          }
          
    }

    useEffect(()=>{
        resetLocations();
        setDataLoaded(true);
    }, [props.item.primaryAccession, dispatch])
   

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
            {dataLoaded ? (
                <div className='subcelDiv'>{formatArray(locations)}</div>
                ) : (
                    <div className='subcelDiv'>Loading...</div>
                )}
            <div className='lengthDiv'>{props.item.sequence.length}</div>
        </div>
    )
}

export default GridItem;