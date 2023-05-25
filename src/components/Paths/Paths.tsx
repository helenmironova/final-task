import './Paths.css'

const Paths = (props: any) => {
    return(
        <div className='paths'>
            <div
            className={`tab ${props.tab === 'details' ? 'tab--active' : ''}`}
            id='detailsTab'
            onClick={() => props.setTab('details')}
            >
                Details
            </div>
            <div
            className={`tab ${props.tab === 'feature' ? 'tab--active' : ''}`}
            id='featureTab'
            onClick={() => props.setTab('feature')}
            >
                Feature viewer
            </div>
            <div
            className={`tab ${props.tab === 'publications' ? 'tab--active' : ''}`}
            id='publicationsTab'
            onClick={() => props.setTab('publications')}
            >
                Publications
            </div>
        </div>
    )
}

export default Paths;