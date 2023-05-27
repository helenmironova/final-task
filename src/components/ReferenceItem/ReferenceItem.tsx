import { useEffect, useState } from 'react';
import './ReferenceItem.css'
import linkImg from '../../assets/linkImg.png'
import linkImgInactive from '../../assets/linkImgInactive.png'

const ReferenceItem = (props: any) => {
    const reference = props.reference;
    const authors = reference?.citation?.authors;
    const maxAuthors = 21;

    const [displayedAuthors, setDisplayedAuthors] = useState<string[]>([]);
    const [showAllAuthors, setShowAllAuthors] = useState(false);
    const thirdLinkActive = (reference?.citation?.citationCrossReferences?.length >= 2);

    useEffect(() => {
        if (authors && authors.length > maxAuthors) {
          setDisplayedAuthors(authors.slice(0, maxAuthors));
        } else {
          setDisplayedAuthors(authors || []);
        }
    }, [authors]);

    const handleAuthorsClick = () => {
        if (authors && authors.length > maxAuthors && showAllAuthors) {
          setDisplayedAuthors(authors);
        }
        if (authors && authors.length > maxAuthors && !showAllAuthors) {
            setDisplayedAuthors(authors.slice(0, maxAuthors));
        }
        setShowAllAuthors(!showAllAuthors);
    };

    return(
        <div className='referenceItemWrapper'>
            <p className='referenceItemHeader'>{reference?.citation?.title}</p>
            <p className="authors" onClick={handleAuthorsClick}>
                {displayedAuthors.join(', ')}
                {authors && authors.length > maxAuthors ? '...' : ''}
            </p>
            <div className='categories'>
                <p className='categoriesLabel'>Categories:&nbsp;<span className='categoriesData'> {reference?.references[0]?.sourceCategories?.join(', ')}</span></p>
            </div>
            <div className='citedFor'>
                <p className='citedForLabel'>Cited for:&nbsp;<span className='citedForData'> {reference?.references[0]?.referencePositions?.join(', ')}</span></p>
            </div>
            <div className='source'>
                <p className='sourceLabel'>Source:&nbsp; <span className='sourceData'>{reference?.references[0]?.source?.name}</span></p>
            </div>

            <div className='linksDiv'>
                <div className='link' onClick={() => window.open(`https://pubmed.ncbi.nlm.nih.gov/${reference?.citation?.citationCrossReferences[0]?.id}`, '_blank')}><p>PubMed</p><img className='linkImg' src={linkImg}/></div>
                <div className='link' onClick={() => window.open(`https://europepmc.org/article/MED/${reference?.citation?.citationCrossReferences[0]?.id}`, '_blank')}><p>Europe PMC</p><img  className='linkImg' src={linkImg}/></div>
                
                <div
                className={thirdLinkActive ? 'link' : 'link--inactive'}
                onClick={thirdLinkActive ? () => window.open(`https://dx.doi.org/${reference?.citation?.citationCrossReferences[1]?.id}`, '_blank') : undefined}
                >
                <p>{`${reference?.citation?.journal} ${reference?.citation?.volume}: ${reference?.citation?.firstPage}-${reference?.citation?.lastPage} (${reference?.citation?.publicationDate})`}</p>
                <img className='linkImg' src={thirdLinkActive ? linkImg : linkImgInactive} alt='DOI' />
                </div>
            </div>

        </div>
    )
}

export default ReferenceItem;