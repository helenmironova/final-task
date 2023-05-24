import './OrganismInput.css'
import { v4 as uuidv4 } from 'uuid';


const OrganismInput = (props: any)=>{

    const handleOrganismChange = (e: any) => {
        props.setFilterOptions({
          organism: e.target.value,
        });
    };

    return(
        <div className='organism__wrapper'>
            <p className='organism__title'>Organism</p>
            <select className='organism__select'   value={props.filterOptions.organism || ''} onChange={(e)=>handleOrganismChange(e)}>
                <option value="">Select an option</option>
                {props.selectorOptions.organismOptions.map((option: any) => (
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