import React from 'react';
import './Table.css';

function Table({ countries }) {
    return (
        <div className='table'>
            {countries.map(({ country, cases }, index) => (
                <div className='tr' key={index}>
                    <div className='td'>{country}</div>
                    <div className='td'><strong>{cases}</strong></div>
                </div>
            ))}
        </div>
    )
}

export default Table;
