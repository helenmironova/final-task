import { useSelector } from 'react-redux';
import './PublicationsTab.css'
import ReferenceItem from '../ReferenceItem/ReferenceItem';
import { v4 as uuidv4 } from 'uuid';


const PublicationsTab = () => {
    const protein = useSelector((state: any) => state.selectedProtein.protein);
    const references = protein?.references;
    return(
        <div className='publicationsWrapper'>
            {references &&
                references.map((reference: any) => (
                    <ReferenceItem reference={reference} key={uuidv4()}/>
                ))}
        </div>
    )
}

export default PublicationsTab;