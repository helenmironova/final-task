import './GridHeaders.css'
import logo from '../../assets/Vector.png'

const GridHeaders = () => {
    return(
        <div className='gridHeaders'>
            <div className='number'>#</div>
            <div className='entry'><p className='entryP'>Entry</p><img src={logo} className='logo'/></div>
            <div className='entryName'><p className='entryP'>Entry Names</p><img src={logo} className='logo'/></div>
            <div className='entryName'><p className='entryP'>Genes</p><img src={logo} className='logo'/></div>
            <div className='entryName'><p className='entryP'>Organism</p><img src={logo} className='logo'/></div>
            <div className='subcel'><p className='entryP'>Subcellular Location</p></div>
            <div className='length'><p className='entryP'>Length</p><img src={logo} className='logo'/></div>

        </div>
    )
}

export default GridHeaders;