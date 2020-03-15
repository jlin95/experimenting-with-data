import React, { useState, useEffect } from 'react';
import * as Papa from 'papaparse';
import { VictoryAxis, VictoryScatter, VictoryChart, VictorySelectionContainer } from 'victory';

import dataset from '../../data/reverie_challenge_data.csv';
import { options } from '../../data/assay_options'

import { generateRanges } from '../../utils/graphingUtils';
import { isValidDataPoint } from '../../utils/validatorUtils';
import { Dropdown } from '../../components/Dropdown';
import { Visualizations } from '../Visualizations';

const Results = () => {

   // Initializing full data and default assay selection
   const [data, setData] = useState([]);
   const [assay, setAssay] = useState({
      selectedAssay: 'assay_0',
      selectedPrediction: 'model_for_assay_0'
   });
   const [smilesData, setSmilesData] = useState([]);
   const [selectionProps, setSelectionProps] = useState([]);

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

   // Helper functions to generate domains for building scatter plot
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
            y: dataPoint[assay.selectedPrediction],
            smiles: dataPoint['smiles'],
            name: dataPoint['identifier']
         }
      });

   const handleOptionChange = e => {
      const transformedSelectedAssay = JSON.parse(e.target.value);
      setAssay({
         selectedAssay: transformedSelectedAssay.assay,
         selectedPrediction: transformedSelectedAssay.prediction
      });
   }

   useEffect(() => {
      setSmilesData([...new Set(selectionProps[0]?.data.map(item => [item.smiles, item.name]))])
   }, [selectionProps]);

   return (
      <div>
         <Dropdown options={options} selectedValue={JSON.stringify(assay.value)} handleOptionChange={handleOptionChange} />
         <VictoryChart
            containerComponent={
               <VictorySelectionContainer
                  selectionStyle={{
                     fill: "tomato", fillOpacity: 0.5,
                     stroke: "tomato", strokeWidth: 2
                  }}
                  onSelection={(props) => setSelectionProps(props)}
               />
            }
            domain={domains}
            width={1200}
            height={600}
            padding={{ top: 10, bottom: 80, left: 40, right: 100 }}

         >
            <VictoryAxis label="Measured Assay Data" />
            <VictoryAxis dependentAxis label="Predicted Assay Data" />
            <VictoryScatter
               style={{ data: { fill: ({ active }) => active ? "#526b2d" : "c43a31" } }}
               size={targetData.size}
               data={targetData}
               x="x"
               y="y"
            />
         </VictoryChart>
         <Visualizations smilesData={smilesData} />
      </div >
   )
}

export { Results }