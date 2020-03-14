export const generateRanges = (assayData, predictionData) => {
    let xRange = [];
    let yRange = [];
    xRange.push(Math.min(...assayData), Math.max(...assayData));
    yRange.push(Math.min(...predictionData), Math.max(...predictionData));

    return {
        x: xRange,
        y: yRange
    }
}
