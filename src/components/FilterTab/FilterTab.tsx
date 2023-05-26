import './FilterTab.css'
import { useSelector, useDispatch } from 'react-redux';
import { setAnnotationOptions, setProteinWithOptions, setOrganismOptions, setAlreadyFetched } from '../../store/selectorOptions';
import { useEffect, useState } from 'react';
import GeneNameInput from '../GeneNameInput/GeneNameInput';
import OrganismInput from '../OrganismInput/OrganismInput';
import SequenceLengthInput from '../SequenceLengthInput/SequenceLengthInput';
import AnnotationInput from '../AnnotationInput/AnnotationInput'
import ProteinInput from '../ProteinInput/ProteinInput';
import { removeItems } from '../../store/listItems';
import { setNewValueFilter } from '../../store/filterOptions';
;

const FilterTab = (props: any) => {
    const dispatch = useDispatch();

    const filterOptions = useSelector((state: any) => state.filterOptions);
    const selectorOptions = useSelector((state: any) => state.selectorOptions);
    const searchText = useSelector((state: any) => state.searchText);
    
    const [applyButtonValid, setApplyButtonValid] = useState(false);

    /*
        fetches new data (without filter options);
    */
    const cancelFunction = () => {
        dispatch(removeItems());
        dispatch(setNewValueFilter({
            isOpen: false,
            geneName: null,
            organism: null,
            sequenceLength__from: null,
            sequenceLength__to: null, 
            annotationScore: null,
            proteinWith: null,
        }));
        props.fetchData(`https://rest.uniprot.org/uniprotkb/search?facets=model_organism,proteins_with,annotation_score&query=(${(searchText==='' || searchText===null) ? "*" : searchText})`);
    }

    /*
        sends fetch request to get selector options;
        saves data in redux via dispatch;
    */
    const fetchDataSelector = () => {
        fetch(`https://rest.uniprot.org/uniprotkb/search?facets=model_organism,proteins_with,annotation_score&query=(cancer)`)
        .then((response) => response.json())
        .then((data) =>{
            dispatch(setAnnotationOptions(data.facets[2].values));
            dispatch(setOrganismOptions(data.facets[0].values));
            dispatch(setProteinWithOptions(data.facets[1].values));
            dispatch(setAlreadyFetched());
        });
    }
    if (!selectorOptions.alreadyFetched) {
        fetchDataSelector();
    }

    //changes apply button visual based on filterOptions change;
    useEffect(()=>{
        const isFilterChanged = Object.values(filterOptions).some(value => value !== null && value !== "");
        setApplyButtonValid(isFilterChanged);
    }, [filterOptions])
    
    /*
        if button is valid: 
        fetches new data (dispatch);
    */
    const applyFilters = () => {
        if(!applyButtonValid) return;
        let url = `https://rest.uniprot.org/uniprotkb/search?fields=accession,id,gene_names,organism_name,length,ft_peptide,cc_subcellular_location&query=(${(searchText==='' || searchText===null) ? "*" : searchText})`;
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
        dispatch(setNewValueFilter({isOpen: false}));
        dispatch(removeItems());
        props.fetchData(url);
    }
    
    return(
        <div className='popupWrapper'>
            <div className='popupWrapperRelative'>
                <p className='popupWrapper__title'>Filters</p>
                <GeneNameInput/>
                <OrganismInput/>
                <SequenceLengthInput/>
                <AnnotationInput/>
                <ProteinInput/>
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