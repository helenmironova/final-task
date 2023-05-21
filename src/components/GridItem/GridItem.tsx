import { v4 as uuidv4 } from 'uuid';
import './GridItem.css'

const GridItem = (props: any) => {
    return(
        <div className='itemWrapper'>
            <div className='numberDiv'>1</div>
            <div className='entryDiv'>{props.item.primaryAccession}</div>
            <div className='entryNameDiv'>{props.item.uniProtkbId}</div>
            <div className='genesDiv'>
                {props.item.genes.map((gene: any) => (
                    <span key={uuidv4()}>
                        <b>{gene.geneName.value}</b>
                        {gene.synonyms && gene.synonyms.length > 0 && (
                            <>
                            {', '}
                                {gene.synonyms.map((synonym: any, index: number) => (
                                    <span key={uuidv4()}>
                                    {synonym.value}
                                    {index !== gene.synonyms.length - 1 && ', '}
                                    </span>
                                ))}
                            </>
                        )}
                    </span>
                ))}
            </div>


        </div>
    )
}

export default GridItem;