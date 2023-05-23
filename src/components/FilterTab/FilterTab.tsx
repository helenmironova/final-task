import './FilterTab.css'


const FilterTab = () => {
    

  

    return(
        <div className='popupWrapper'>
            <div className='popupWrapperRelative'>
                <p className='popupWrapper__title'>Filters</p>

                <div className='geneNameWrapper'>
                    <p className='geneName__title'>Gene Name</p>
                    <input type='text' className='geneName__input' placeholder='Enter Gene Name'></input>
                </div>

                <div className='organism__wrapper'>
                    <p className='organism__title'>Organism</p>
                    <select className='organism__select' defaultValue={''}>
                        <option value="" disabled hidden>Select an option</option>
                    </select>
                </div>

                <div className='sequenceLength__wrapper'>
                    <p className='sequenceLength__title'>Sequence Length</p>
                    <div className='sl__ww'>
                        <input type='number' className='from__input' placeholder='from'></input>
                        <div className='dec'></div>
                        <input type='number' className='to__input' placeholder='to'></input>
                    </div>
                </div>

                <div className='annotation__wrapper'>
                    <p className='annotation__title'>Annotation score</p>
                    <select className='annotation__select' defaultValue={''}>
                        <option value="" disabled hidden>Select an option</option>
                    </select>
                </div>

                <div className='protein__wrapper'>
                    <p className='protein__title'>Annotation score</p>
                    <select className='protein__select' defaultValue={''}>
                        <option value="" disabled hidden>Select an option</option>
                    </select>
                </div>

                <div className='buttonsDiv'>
                    <button className='cancelButton'>Cancel</button>
                    <button className='applyButton--disabled'>Apply Filters</button>

                </div>
            </div>
        </div>
    )
}

export default FilterTab