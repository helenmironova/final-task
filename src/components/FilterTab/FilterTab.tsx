import './FilterTab.css'
import { useSelector, useDispatch } from 'react-redux';
import { setAnnotationOptions, setProteinWithOptions, setOrganismOptions, setAlreadyFetched } from '../../store/selectorOptions';
import { useEffect, useState } from 'react';
import GeneNameInput from '../FilterInputs/GeneNameInput/GeneNameInput';
import OrganismInput from '../FilterInputs/OrganismInput/OrganismInput';
import SequenceLengthInput from '../FilterInputs/SequenceLengthInput/SequenceLengthInput';
import AnnotationInput from '../FilterInputs/AnnotationInput/AnnotationInput'
import ProteinInput from '../FilterInputs/ProteinInput/ProteinInput';
import { fetchItems, removeItems } from '../../store/listItems';
import { setNewValueFilter } from '../../store/filterOptions';
import { setNewValueSort } from '../../store/sortOptions';
import { setNewSelectedProteinName } from '../../store/selectedProtein';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';


const FilterTab = () => {
    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

    //filters stored in redux;
    const filterOptions = useSelector((state: any) => state.filterOptions);
    //selector options stored in redux;
    const selectorOptions = useSelector((state: any) => state.selectorOptions);
    //search text stored in redux;
    const searchText = useSelector((state: any) => state.searchText);
    
    //determines when 'apply filters' button should be valid;
    const [applyButtonValid, setApplyButtonValid] = useState(false);

    /*
        removes previous list items from redux;
        sets filters to no filters (default);
        sets sort to no sort (default);
        fetches new list items with just searchText;
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
        dispatch(setNewValueSort({selected: 0, type: 0}))
       dispatch(fetchItems(`https://rest.uniprot.org/uniprotkb/search?facets=model_organism,proteins_with,annotation_score&query=(${(searchText==='' || searchText===null) ? "*" : searchText})`));
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
        const isFilterChanged = Object.values(filterOptions).some(value => value !== null && value !== "" && typeof(value)!=='boolean');
        setApplyButtonValid(isFilterChanged);
    }, [filterOptions])
    
    /*
        if button is valid: 
        adds filter options to url;
        defaultly selects geneName as selected protein name; !!!!!
        closes filter tab;
        removes previous list items from redux;
        sets sort options to no sort (default);
        fetches new list items;
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
            const from = filterOptions.sequenceLength__from;
            const to = filterOptions.sequenceLength__to;
            url += ` AND (length:%5B${from} TO ${to}%5D)`;
        }
        if(filterOptions.annotationScore && filterOptions.annotationScore!=''){
            url+=` AND (annotation_score:${filterOptions.annotationScore})`;
        }
        if(filterOptions.proteinWith && filterOptions.proteinWith!=''){
            url+=` AND (proteins_with:${filterOptions.proteinWith})`;
        }
        dispatch(setNewSelectedProteinName(filterOptions.geneName));
        dispatch(setNewValueFilter({isOpen: false}));
        dispatch(removeItems());
        dispatch(setNewValueSort({selected: 0, type: 0}))
        dispatch(fetchItems(url));
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