import { useEffect, useRef } from 'react';
import './GeneNameInput.css'
import { useDispatch, useSelector } from 'react-redux';
import { setNewValueFilter } from '../../store/filterOptions';

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

    return(
        <div className='geneNameWrapper'>
            <p className='geneName__title'>Gene Name</p>
            <input type='text' ref={nameInput} className='geneName__input' placeholder='Enter Gene Name' onChange={(e)=>dispatch(setNewValueFilter({geneName: e.target.value}))}></input>
        </div>
    )
}

export default GeneNameInput