import { useEffect, useRef } from 'react';
import './ProteinInput.css'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { setNewValueFilter } from '../../store/filterOptions';


const ProteinInput = () => {
    const dispatch = useDispatch();

    const filterOptions = useSelector((state: any) => state.filterOptions);
    const selectorOptions = useSelector((state: any) => state.selectorOptions);

    const selectRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        if (selectRef.current && filterOptions.proteinWith !== null && filterOptions.proteinWith !== '') {
          const options = selectRef.current.options;
          for (let i = 0; i < options.length; i++) {
            if (options[i].value === filterOptions.proteinWith) {
              selectRef.current.selectedIndex = i;
              break;
            }
          }
        }
    }, [filterOptions.proteinWith]);

    return(
        <div className='protein__wrapper'>
            <p className='protein__title'>Protein With</p>
            <select className='protein__select' ref={selectRef} value={filterOptions.proteinWith || ''} onChange={(e)=>dispatch(setNewValueFilter({proteinWith: e.target.value}))} name='protein'>
                <option value="" disabled hidden>Select an option</option>
                {selectorOptions.proteinWithOptions.map((option: any) => (
                    <option key={uuidv4()} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default ProteinInput;