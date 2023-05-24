import { useEffect, useRef } from 'react';
import './ProteinInput.css'
import { v4 as uuidv4 } from 'uuid';


const ProteinInput = (props: any) => {
    const selectRef = useRef<HTMLSelectElement>(null);

    const handleProteinWithChange = (e: any) => {
        props.setFilterOptions({
          proteinWith: e.target.value,
        });
    };


    useEffect(() => {
        if (selectRef.current && props.filterOptions.proteinWith !== null && props.filterOptions.proteinWith !== '') {
          const options = selectRef.current.options;
          for (let i = 0; i < options.length; i++) {
            if (options[i].value === props.filterOptions.proteinWith) {
              selectRef.current.selectedIndex = i;
              break;
            }
          }
        }
      }, [props.filterOptions.proteinWith]);

    return(
        <div className='protein__wrapper'>
            <p className='protein__title'>Protein With</p>
            <select className='protein__select' ref={selectRef} value={props.filterOptions.proteinWith || ''} onChange={(e)=>handleProteinWithChange(e)}>
                <option value="" disabled hidden>Select an option</option>
                {props.selectorOptions.proteinWithOptions.map((option: any) => (
                    <option key={uuidv4()} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default ProteinInput;