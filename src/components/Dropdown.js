import React from 'react';

const Dropdown = ({
    options, handleOptionChange, selectedValue
}) => {
    return (
        <select
            value={selectedValue}
            onChange={handleOptionChange}
        >
            {options.map(o => (
                <option key={o.value.assay} value={JSON.stringify(o.value)}>{o.label}</option>
            ))}
        </select >
    );
};

export { Dropdown }