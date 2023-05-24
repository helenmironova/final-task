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
import { removeItems } from '../../store/listItems';

const FilterTab = (props: any) => {
    const filterOptions = useSelector((state: any) => state.filterOptions);
    const dispatch = useDispatch();
    const selectorOptions = useSelector((state: any) => state.selectorOptions);
    const searchText = useSelector((state: any) => state.searchText);
    const [applyButtonValid, setApplyButtonValid] = useState(false);

    const setFilterOptions = (newObj: any) => {
        dispatch(setNewValue(newObj));
    }

    /*
        closes filter popup;
        clears filterOptions;
    */
    const cancelFunction = () => {
        dispatch(setNewValue({isOpen: false}));   
        setFilterOptions({
            geneName: null,
            organism: null,
            sequenceLength__from: null,
            sequenceLength__to: null,
            annotationScore: null,
            proteinWith: null
        });
        props.fetchData();
    }

    /*
        set options in redux to fetched data;
    */
    const fetchDataSelector = () => {
        fetch(`https://rest.uniprot.org/uniprotkb/search?facets=model_organism,proteins_with,annotation_score&query=(${searchText})`)
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
          fetchDataSelector();
        }
    }, []);
        
    /*
        changes apply button visual;
    */
    useEffect(()=>{
        const isFilterChanged = Object.values(filterOptions).some(value => value !== null && value !== "");
        setApplyButtonValid(isFilterChanged);
    }, [filterOptions])
    

    const applyFilters = () => {
        if(!applyButtonValid) return;
        dispatch(removeItems());
        let url = `https://rest.uniprot.org/uniprotkb/search?fields=accession,id,gene_names,organism_name,length,ft_peptide,cc_subcellular_location&query=(${searchText})`;
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
        console.log(url);
        props.fetchData(url);
        dispatch(setNewValue({isOpen: false}));   
    }

    
    
    return(
        <div className='popupWrapper'>
            <div className='popupWrapperRelative'>
                <p className='popupWrapper__title'>Filters</p>
                
                <GeneNameInput filterOptions={filterOptions} setFilterOptions={setFilterOptions}/>

                <OrganismInput filterOptions={filterOptions} setFilterOptions={setFilterOptions} selectorOptions={selectorOptions}/>

                <SequenceLengthInput filterOptions={filterOptions} setFilterOptions={setFilterOptions}/>

                <AnnotationInput filterOptions={filterOptions} setFilterOptions={setFilterOptions} selectorOptions={selectorOptions}/>

                <ProteinInput filterOptions={filterOptions} setFilterOptions={setFilterOptions} selectorOptions={selectorOptions}/>

                <div className='buttonsDiv'>
                    <button className='cancelButton' onClick={cancelFunction}>Cancel</button>
                    <button className={`${applyButtonValid ? 'applyButton--active' : 'applyButton--disabled'}`} onClick={applyFilters}>
                        Apply Filters
                    </button>                
                </div>
            </div>
        </div>
    )
}

export default FilterTab