import React, { useState, useEffect } from 'react';
import * as Papa from 'papaparse';
import { VictoryAxis, VictoryScatter, VictoryChart } from 'victory';

import dataset from '../../data/reverie_challenge_data.csv';
import { options } from '../../data/assay_options'

import { generateRanges } from '../../utils/graphingUtils';
import { isValidDataPoint } from '../../utils/validatorUtils';

const Results = () => {

   const [data, setData] = useState([]);
   const [assay, setAssay] = useState({
      selectedAssay: 'assay_0',
      selectedPrediction: 'model_for_assay_0'
   });
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

   const assayRanges = data.map(result => result[assay.selectedAssay]).filter(isValidDataPoint);
   const predictionRanges = data.map(result => result[assay.selectedPrediction]).filter(isValidDataPoint);
   const domains = generateRanges(assayRanges, predictionRanges);

   const showDataPoint = dataPoint => {
      return dataPoint[assay.selectedPrediction] !== null && dataPoint[assay.selectedAssay] != null;
   }
   const targetData = data.filter(showDataPoint)
      .map(dataPoint => {
         return {
            x: dataPoint[assay.selectedAssay],
            y: dataPoint[assay.selectedPrediction]
         }
      });

   return <div>
      <select
         value={JSON.stringify(assay.value)}
         onChange={e => {
            const transformedSelectedAssay = JSON.parse(e.target.value);
            setAssay({
               selectedAssay: transformedSelectedAssay.assay,
               selectedPrediction: transformedSelectedAssay.prediction
            });
         }}
      >
         {options.map(o => (
            <option value={JSON.stringify(o.value)}>{o.label}</option>
         ))}
      </select>
      <VictoryChart
         domain={domains}
         width={1200}
         height={600}
         padding={{ top: 10, bottom: 80, left: 40, right: 100 }}

      >
         <VictoryAxis label="Measured Assay Data" />
         <VictoryAxis dependentAxis label="Predicted Assay Data" />

         <VictoryScatter
            style={{ data: { fill: "#c43a31" } }}
            size={targetData.size}
            data={targetData}
            x="x"
            y="y"
         />
      </VictoryChart>
   </div >
}

export { Results }