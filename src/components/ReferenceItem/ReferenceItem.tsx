import { useEffect, useState } from 'react';
import './ReferenceItem.css'

const ReferenceItem = (props: any) => {
    const reference = props.reference;
    const authors = reference?.citation?.authors;
    const maxAuthors = 21;

    const [displayedAuthors, setDisplayedAuthors] = useState<string[]>([]);
    const [showAllAuthors, setShowAllAuthors] = useState(false);

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



    console.log(reference);

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

        </div>
    )
}

export default ReferenceItem;