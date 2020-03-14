import React, { useState, useEffect } from 'react';
import * as Papa from 'papaparse';
import { VictoryScatter, VictoryChart } from 'victory';

import dataset from '../../data/reverie_challenge_data.csv';
import { options } from '../../data/assay_options'

import { generateRanges } from '../../utils/graphingUtils';
import { isValidDataPoint } from '../../utils/validatorUtils';

// Get the data

const Results = () => {
   const [data, setData] = useState([]);
   // const [assay, setAssay] = useState({
   //    selectedAssay: 'assay_0',
   //    selectedPrediction: 'model_for_assay_0'
   // });
   const [prediction, setPrediction] = useState('model_for_assay_0');
   const [assay, setAssay] = useState('assay_0');
   useEffect(() => {
      Papa.parse(dataset, {
         header: true,
         dynamicTyping: true,
         skipEmptyLines: true,
         download: true,
         complete: results => {
            setData(results.data);
         }
      })
   }, []);

   const assayRanges = data.map(result => result[assay]).filter(isValidDataPoint);
   const predictionRanges = data.map(result => result[prediction]).filter(isValidDataPoint);
   const domains = generateRanges(assayRanges, predictionRanges);

   const showDataPoint = dataPoint => {
      return dataPoint[prediction] !== null && dataPoint[assay] != null;
   }

   const targetData = data.filter(showDataPoint)
      .map(dataPoint => {
         return {
            x: dataPoint[assay],
            y: dataPoint[prediction]
         }
      });
   console.log(assay);
   return <div>
      <select
         key={assay}
         value={assay}
         onChange={(event, data) => {
            setAssay(data);
         }}
      >
         {options.map(o => (
            <option value={o.value}>{o.label}</option>
         ))}
      </select>
      <VictoryChart
         domain={domains}
         width={1200}
         height={600}
         padding={{ top: 10, bottom: 80, left: 40, right: 100 }}
      >
         <VictoryScatter
            style={{ data: { fill: "#c43a31" } }}
            size={targetData.size}
            data={targetData}
         />
      </VictoryChart>
   </div >
}

export { Results }