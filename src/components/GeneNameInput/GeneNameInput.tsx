import { useEffect, useRef } from 'react';
import './GeneNameInput.css'

const GeneNameInput = (props: any) => {
    const handleNameChange = (e: any) => {
        props.setFilterOptions({
            geneName: e.target.value,
        })
    };

    const nameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.filterOptions.geneName != null && props.filterOptions.geneName !== '') {
        if(!nameInput.current) return;
        nameInput.current.value = props.filterOptions.geneName;
    }
    }, [props.filterOptions.geneName]);

    return(
        <div className='geneNameWrapper'>
            <p className='geneName__title'>Gene Name</p>
            <input type='text' ref={nameInput} className='geneName__input' placeholder='Enter Gene Name' onChange={(e)=>handleNameChange(e)}></input>
        </div>
    )
}

export default GeneNameInput