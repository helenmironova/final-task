import { useSelector } from 'react-redux';
import './SequenceData.css'

const SequenceData = () => {
    const protein = useSelector((state: any) => state.selectedProtein.protein)


    function formatDate(dateString:string) {
        const dateParts = dateString.split('-'); // Split the date string into an array of parts
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const day = parseInt(dateParts[2]);
      
        const months = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
      
        const formattedDate = new Date(year, month - 1, day); // Create a new Date object with the given year, month, and day
        const monthName = months[formattedDate.getMonth()]; // Get the month name from the months array
        const dayOfMonth = formattedDate.getDate(); // Get the day of the month
      
        const formattedDateString = `${monthName} ${dayOfMonth}, ${year}`;
        return formattedDateString;
    }

    return(
        <div className='sequence'>
            <p className='sequenceHeader'>Sequence</p>
            <div className='sequenceData'>
                <div className='dataCol'>
                    <div className='dataCell'>
                        <p className='dataCellPHeader'>Length</p>
                        <p className='dataCellPInfo'>{protein.sequence.length}</p>
                    </div>
                    <div className='dataCell'>
                        <p className='dataCellPHeader'>Mass (Da)</p>
                        <p className='dataCellPInfo'>{protein.sequence.molWeight}</p>
                    </div>
                </div>
                <div className='dataCol'>
                    <div className='dataCell'>
                        <p className='dataCellPHeader'>Last updated</p>
                        <p className='dataCellPInfo'>{formatDate(protein.entryAudit.lastSequenceUpdateDate)}</p>
                    </div>
                    <div className='dataCell'>
                        <p className='dataCellPHeader'>Checksum</p>
                        <p className='dataCellPInfo'>{protein.sequence.crc64}</p>   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SequenceData;