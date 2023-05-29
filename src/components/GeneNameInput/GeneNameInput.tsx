import { useEffect, useRef } from 'react';
import './GeneNameInput.css'
import { useDispatch, useSelector } from 'react-redux';
import { setNewValueFilter } from '../../store/filterOptions';
import { setNewSelectedProteinName } from '../../store/selectedProtein';

const GeneNameInput = () => {
    const dispatch = useDispatch();

    const filterOptions = useSelector((state: any) => state.filterOptions);

    const nameInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (filterOptions.geneName != null && filterOptions.geneName !== '') {
            if(!nameInput.current) return;
            nameInput.current.value = filterOptions.geneName;
        }
    }, [filterOptions.geneName]);

    const handleChange = (e: any) => {
        dispatch(setNewValueFilter({geneName: e.target.value}))
        dispatch(setNewSelectedProteinName(e.target.value))
    }
    

    return(
        <div className='geneNameWrapper'>
            <p className='geneName__title'>Gene Name</p>
            <input type='text' ref={nameInput} className='geneName__input' placeholder='Enter Gene Name' onChange={(e)=>handleChange(e)}></input>
        </div>
    )
}

export default GeneNameInput