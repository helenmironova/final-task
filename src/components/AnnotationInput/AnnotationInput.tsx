import './AnnotationInput.css'
import { v4 as uuidv4 } from 'uuid';

const AnnotationInput = (props: any) => {
    const handleAnnotationChange = (e: any) => {
        props.setFilterOptions({
          annotationScore: e.target.value,
        });
      };
    return (
        <div className='annotation__wrapper'>
            <p className='annotation__title'>Annotation score</p>
            <select className='annotation__select' value={props.filterOptions.annotationScore || ''} onChange={(e)=>handleAnnotationChange(e)}>
                <option value="">Select an option</option>
                {props.selectorOptions.annotationOptions.map((option: any) => (
                    <option key={uuidv4()} value={option.value}>
                        {option.value}
                    </option>
                ))}
            </select>
            <span className="custom-arrow"></span>

        </div>
    )
}

export default AnnotationInput;