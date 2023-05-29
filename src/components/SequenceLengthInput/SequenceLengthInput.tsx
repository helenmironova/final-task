import { useDispatch, useSelector } from 'react-redux';
import './SequenceLength.css';
import { setNewValueFilter } from '../../store/filterOptions';

const SequenceLengthInput = () => {
  const filterOptions = useSelector((state: any) => state.filterOptions);
  const dispatch = useDispatch();

  const handleFromInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setNewValueFilter({ sequenceLength__from: e.target.value }));
  };

  const handleToInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setNewValueFilter({ sequenceLength__to: e.target.value }));
  };

  return (
    <div className='sequenceLength__wrapper'>
      <p className='sequenceLength__title'>Sequence Length</p>
      <div className='sl__ww'>
        <input
          type='number'
          className='from__input'
          placeholder='from'
          onChange={handleFromInputChange}
          value={filterOptions.sequenceLength__from || ''}
        />
        <div className='dec'></div>
        <input
          type='number'
          className='to__input'
          placeholder='to'
          onChange={handleToInputChange}
          value={filterOptions.sequenceLength__to || ''}
        />
      </div>
    </div>
  );
};

export default SequenceLengthInput;
