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
        </div>
    )
}

export default ReferenceItem;