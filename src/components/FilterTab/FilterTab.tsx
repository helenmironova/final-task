import './FilterTab.css'
import { useSelector, useDispatch } from 'react-redux';
import { setNewValue } from '../../store/filterOptions';
import { setAnnotationOptions, setProteinWithOptions, setOrganismOptions, setAlreadyFetched } from '../../store/selectorOptions';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FilterTab = () => {
    const filterOptions = useSelector((state: any) => state.filterOptions);
    const dispatch = useDispatch();
    const selectorOptions = useSelector((state: any) => state.selectorOptions);
    

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
            console.log(data);
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
        
    
    return(
        <div className='popupWrapper'>
            <div className='popupWrapperRelative'>
                <p className='popupWrapper__title'>Filters</p>

                <div className='geneNameWrapper'>
                    <p className='geneName__title'>Gene Name</p>
                    <input type='text' className='geneName__input' placeholder='Enter Gene Name'></input>
                </div>

                <div className='organism__wrapper'>
                    <p className='organism__title'>Organism</p>
                    <select className='organism__select' defaultValue={''}>
                        <option value="" disabled hidden>Select an option</option>
                        {selectorOptions.organismOptions.map((option: any) => (
                            <option key={uuidv4()} value={option.value}>
                                {option.label}
                            </option>
                        ))}

                    </select>
                </div>

                <div className='sequenceLength__wrapper'>
                    <p className='sequenceLength__title'>Sequence Length</p>
                    <div className='sl__ww'>
                        <input type='number' className='from__input' placeholder='from'></input>
                        <div className='dec'></div>
                        <input type='number' className='to__input' placeholder='to'></input>
                    </div>
                </div>

                <div className='annotation__wrapper'>
                    <p className='annotation__title'>Annotation score</p>
                    <select className='annotation__select' defaultValue={''}>
                        <option value="" disabled hidden>Select an option</option>
                        {selectorOptions.annotationOptions.map((option: any) => (
                            <option key={uuidv4()} value={option.value}>
                                {option.value}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='protein__wrapper'>
                    <p className='protein__title'>Annotation score</p>
                    <select className='protein__select' defaultValue={''}>
                        <option value="" disabled hidden>Select an option</option>
                        {selectorOptions.proteinWithOptions.map((option: any) => (
                            <option key={uuidv4()} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='buttonsDiv'>
                    <button className='cancelButton' onClick={cancelFunction}>Cancel</button>
                    <button className='applyButton--disabled'>Apply Filters</button>

                </div>
            </div>
        </div>
    )
}

export default FilterTab