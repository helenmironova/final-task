import { useDispatch} from 'react-redux';
import './SequenceLength.css'
import { setNewValue } from '../../store/filterOptions';

const SequenceLengthInput = () => {
    const dispatch = useDispatch();

    return(
        <div className='sequenceLength__wrapper'>
            <p className='sequenceLength__title'>Sequence Length</p>
            <div className='sl__ww'>
                <input type='number' className='from__input' placeholder='from' onChange={(e)=>dispatch(setNewValue({sequenceLength__from: e.target.value}))}></input>
                <div className='dec'></div>
                <input type='number' className='to__input' placeholder='to' onChange={(e)=>dispatch(setNewValue({sequenceLength__to: e.target.value}))}></input>
            </div>
        </div>
    )
}

export default SequenceLengthInput;