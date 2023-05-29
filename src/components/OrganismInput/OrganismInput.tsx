import { useDispatch, useSelector } from 'react-redux';
import './OrganismInput.css'
import { v4 as uuidv4 } from 'uuid';
import { setNewValueFilter } from '../../store/filterOptions';


const OrganismInput = ()=>{
    const dispatch = useDispatch();

    const filterOptions = useSelector((state: any) => state.filterOptions);
    const selectorOptions = useSelector((state: any) => state.selectorOptions);

    return(
        <div className='organism__wrapper'>
            <p className='organism__title'>Organism</p>
            <select className='organism__select'   value={filterOptions.organism || ''} onChange={(e)=>dispatch(setNewValueFilter({organism: e.target.value}))} name='organism'>
                <option value="">Select an option</option>
                {selectorOptions.organismOptions.map((option: any) => (
                    <option key={uuidv4()} value={option.value}>
                         {option.label}
                    </option>
                ))}
            </select>
            <span className="custom-arrow"></span>

        </div>
    )
}

export default OrganismInput