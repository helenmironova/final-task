import './BasicData.css'

const BasicData = (props: any) => {
    const protein = props.protein;
    console.log(protein)
    return(
        <div className='basicDataWrapper'>
            <div className='bdwTop'>
                <p className='basicDataHeader'>{protein.primaryAccession} / {protein.uniProtkbId}</p>
                <div className='btwOrganism'>{protein?.organism?.scientificName}</div>
            </div>

            <div className='info'>
                <div className='infoTop'>
                    <p className='infoTopHeader'>Protein</p>
                    <p className='infoTopData'>{protein?.primaryAccession}</p>
                </div>
                <div className='infoBottom'>
                    <p className='infoBottomHeader'>Gene</p>
                    <p className='infoBottomData'>{protein?.genes[0]?.geneName?.value}</p>
                </div>
            </div>
        </div>
    )
}

export default BasicData;