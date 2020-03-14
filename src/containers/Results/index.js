import React, { useState, useRef, useEffect } from 'react';
import dataset from '../../data/reverie_challenge_data.csv'
import * as Papa from 'papaparse'
import { generateRanges } from '../../utils/graphingUtils'
import { VictoryScatter, VictoryChart } from 'victory';

// Get the data

const Results = () => {
   const [data, setData] = useState([]);
   const [assay, setAssay] = useState({
      selectedAssay: 'assay_0' // default assay
   });
   useEffect(() => {
      Papa.parse(dataset, {
         header: true,
         dynamicTyping: true,
         download: true,
         complete: results => {
            setData(results.data);
         }
      })
   }, []);
   const assayRanges = data.map(result => result.assay_0).filter(value => value != null);
   const predictionRanges = data.map(result => result.model_for_assay_0).filter(value => value != null);
   const domains = generateRanges(assayRanges, predictionRanges);


   return <VictoryChart
      domain={domains}
   >
      <VictoryScatter
         style={{ data: { fill: "#c43a31" } }}
         size={5}
         data={[
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 7 }
         ]}
      />
   </VictoryChart>
}

export { Results }