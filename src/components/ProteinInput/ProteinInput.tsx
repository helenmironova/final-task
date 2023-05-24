import './ProteinInput.css'
import { v4 as uuidv4 } from 'uuid';


const ProteinInput = (props: any) => {
    const handleProteinWithChange = (e: any) => {
        props.setLocalFilterChanges((prevChanges: any) => ({
          ...prevChanges,
          proteinWith: e.target.value,
        }));
      };
        
    return(
        <div className='protein__wrapper'>
            <p className='protein__title'>Protein With</p>
            <select className='protein__select' defaultValue={''} onChange={(e)=>handleProteinWithChange(e)}>
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