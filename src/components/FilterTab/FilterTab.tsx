import './FilterTab.css'
import { useSelector, useDispatch } from 'react-redux';
import { setNewValue } from '../../store/filterOptions';
import { setAnnotationOptions, setProteinWithOptions, setOrganismOptions, setAlreadyFetched } from '../../store/selectorOptions';
import { useEffect, useState } from 'react';
import GeneNameInput from '../GeneNameInput/GeneNameInput';
import OrganismInput from '../OrganismInput/OrganismInput';
import SequenceLengthInput from '../SequenceLengthInput/SequenceLengthInput';
import AnnotationInput from '../AnnotationInput/AnnotationInput'
import ProteinInput from '../ProteinInput/ProteinInput';

const FilterTab = () => {
    const filterOptions = useSelector((state: any) => state.filterOptions);
    const dispatch = useDispatch();
    const selectorOptions = useSelector((state: any) => state.selectorOptions);
    
    const [localFilterChanges, setLocalFilterChanges] = useState({
        geneName: null,
        organism: null,
        sequenceLength__from: null,
        sequenceLength__to: null,
        annotationScore: null,
        proteinWith: null,
    });

    /*
        closes filter popup;
    */
    const cancelFunction = () => {
        dispatch(setNewValue({isOpen: false}));   
    }

    /*
        set options in redux to fetched data;
    */
    const fetchData = () => {
        fetch('https://rest.uniprot.org/uniprotkb/search?facets=model_organism,proteins_with,annotation_score&query=(cancer)')
        .then((response) => response.json())
        .then((data) =>{
            dispatch(setAnnotationOptions(data.facets[2].values));
            dispatch(setOrganismOptions(data.facets[0].values));
            dispatch(setProteinWithOptions(data.facets[1].values));
            dispatch(setAlreadyFetched());
        });
    }

    /*
        if selector options has not yet been fetched, I fetch them;
    */
    useEffect(() => {
        if (!selectorOptions.alreadyFetched) {
          fetchData();
        }
    }, []);
        
    useEffect(()=>{
        //console.log(localFilterChanges);
    }, [localFilterChanges])
    
    
    return(
        <div className='popupWrapper'>
            <div className='popupWrapperRelative'>
                <p className='popupWrapper__title'>Filters</p>
                
                <GeneNameInput localFilterChanges={localFilterChanges} setLocalFilterChanges={setLocalFilterChanges}/>

                <OrganismInput localFilterChanges={localFilterChanges} setLocalFilterChanges={setLocalFilterChanges} selectorOptions={selectorOptions}/>

                <SequenceLengthInput localFilterChanges={localFilterChanges} setLocalFilterChanges={setLocalFilterChanges}/>

                <AnnotationInput localFilterChanges={localFilterChanges} setLocalFilterChanges={setLocalFilterChanges} selectorOptions={selectorOptions}/>

                <ProteinInput localFilterChanges={localFilterChanges} setLocalFilterChanges={setLocalFilterChanges} selectorOptions={selectorOptions}/>

                <div className='buttonsDiv'>
                    <button className='cancelButton' onClick={cancelFunction}>Cancel</button>
                    <button className='applyButton--disabled'>Apply Filters</button>
                </div>
            </div>
        </div>
    )
}

export default FilterTab