import SmilesDrawer from 'smiles-drawer';
import React from 'react';

const Visualizations = ({ smilesData }) => {
    return smilesData.map(data => <IndividualVisualization smileDataPoint={data} />)
}

export { Visualizations }
const IndividualVisualization = ({ smileDataPoint }) => {
    SmilesDrawer.apply()

    return <div>
        <p>{smileDataPoint[1]}</p>
        <canvas data-smiles={smileDataPoint[0].toString()}></canvas>
    </div >
}
