import { useDispatch, useSelector } from 'react-redux/es/exports';
import './AnnotationInput.css'
import { v4 as uuidv4 } from 'uuid';
import { setNewValueFilter } from '../../../store/filterOptions';

const AnnotationInput = () => {
    const dispatch = useDispatch();

    const filterOptions = useSelector((state: any) => state.filterOptions);
    const selectorOptions = useSelector((state: any) => state.selectorOptions);
      
    return (
        <div className='annotation__wrapper'>
            <p className='annotation__title'>Annotation score</p>
            <select className='annotation__select' value={filterOptions.annotationScore || ''} onChange={(e)=>dispatch(setNewValueFilter({annotationScore: e.target.value}))} name='annotation'>
                <option value="">Select an option</option>
                {selectorOptions.annotationOptions.map((option: any) => (
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