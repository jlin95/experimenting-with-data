import React from 'react';

const Dropdown = props => {
    return (
        <select
            value={props.selectedOption}
            onChange={props.handleChange}>
            {props.options.map(o => (
                <option value={o.value}>{o.label}</option>
            ))}
        </select>
    );
};

export { Dropdown }