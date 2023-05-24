import './SequenceLength.css'

const SequenceLengthInput = (props: any) => {
    const handleLengthChange1 = (e: any) => {
        props.setLocalFilterChanges((prevChanges:any) => ({
          ...prevChanges,
          sequenceLength__from: e.target.value,
        }));
      };
      const handleLengthChange2 = (e: any) => {
        props.setLocalFilterChanges((prevChanges: any) => ({
          ...prevChanges,
          sequenceLength__to: e.target.value,
        }));
      };
    return(
        <div className='sequenceLength__wrapper'>
            <p className='sequenceLength__title'>Sequence Length</p>
            <div className='sl__ww'>
                <input type='number' className='from__input' placeholder='from' onChange={(e)=>handleLengthChange1(e)}></input>
                <div className='dec'></div>
                <input type='number' className='to__input' placeholder='to' onChange={(e)=>handleLengthChange2(e)}></input>
            </div>
        </div>
    )
}

export default SequenceLengthInput;