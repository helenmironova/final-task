import './BasicData.css'

const BasicData = (props: any) => {
    const protein = props.protein;

    const fullName =
        protein?.proteinDescription?.recommendedName?.fullName?.value ||
        (protein?.proteinDescription?.alternativeNames &&
        protein.proteinDescription.alternativeNames.length > 0 &&
        protein.proteinDescription.alternativeNames[0].fullName?.value) ||
        (protein?.proteinDescription?.submissionNames &&
        protein.proteinDescription.submissionNames.length > 0 &&
        protein.proteinDescription.submissionNames[0].fullName?.value) ||
    "";

    return(
        <div className='basicDataWrapper'>
            <div className='bdwTop'>
                <p className='basicDataHeader'>{protein.primaryAccession} / {protein.uniProtkbId}</p>
                <div className='btwOrganism'>{protein?.organism?.scientificName}</div>
            </div>

            <div className='info'>
                <div className='infoTop'>
                    <p className='infoTopHeader'>Protein</p>
                    <p className='infoTopData'>{fullName}</p>
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