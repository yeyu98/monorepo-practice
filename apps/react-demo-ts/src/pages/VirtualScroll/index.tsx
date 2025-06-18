import React from 'react';
import FixedSizeList from './components/FixedSizeList';
import './index.less'

function VirtualScroll() {
    const Row = ({index, style}: any) => {
        return <div style={{...style, background: index % 2 === 0 ? '#add8e6' : '#f08080'}} className='row'>
            {index}
        </div>
    }
    return (
        <div className='virtual-scroll'>
            <FixedSizeList itemCount={1000} itemSize={50}>
                {Row}
            </FixedSizeList>
        </div>
    );
}

export default VirtualScroll;