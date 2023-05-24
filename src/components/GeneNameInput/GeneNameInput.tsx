import './GeneNameInput.css'

const GeneNameInput = (props: any) => {
    const handleNameChange = (e: any) => {
        props.setLocalFilterChanges((prevChanges: any) => ({
          ...prevChanges,
          geneName: e.target.value,
        }));
    };

    return(
        <div className='geneNameWrapper'>
            <p className='geneName__title'>Gene Name</p>
            <input type='text' className='geneName__input' placeholder='Enter Gene Name' onChange={(e)=>handleNameChange(e)}></input>
        </div>
    )
}

export default GeneNameInput