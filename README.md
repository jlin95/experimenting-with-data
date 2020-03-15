# Requirements 

Make sure you have either npm or yarn installed. 

## Available Scripts

In the project directory, you can run:

### `yarn install && yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# How to interact with the UI

To start, the UI already loads 'Assay 0' by default, for all the 914 componds. This brings up all the data points corresponding to Assay 0, and thereby Model for Assay 0 as well. The assumption held here is that as a user, one would wish to view all data points for a particular assay against the model prediction, at any point of usage of this dashboard.

To switch to view visualizations for another assay, simply use the dropdown located in the top left corner to view. 

To view the compounds' structure, Victory has this really neat feature that allows you to just drag over a certain area of the plot. Just drag over an area you want to view and the relevant compounds will show up below the scatter plot. 

Select 1 data point at a time.

## Some assumptions and considerations made

In this challenge, in the spirit of rapid prototyping, I started with using d3, but after toiling for a longer than expected time on dealing with d3 v5, I decided to go with an alternate library called Victory, where I could construct scatter plots much more quickly. 

A quick note to make as well was that I'd removed the first header in the csv - I recognize that at some point focusing too much time on stripping away the first row for csv parsing would take away precious time from actually coding up the visualizations. 

For the missing values among the assay data, I have chosen to filter them out in the final data set and not show them at all in the scatter plot. 

# Code Structure

```
    /components -- only for presentational components
    /containers -- contains smart components that deal with logic handling
        /Visualizations -- handles the actual rendering of the compound structures
        /Results -- handles data processing, plotting, among other things
    /data -- contains static data (like dropdown option data, hardcoded for now, and the challenge data)
    /utils -- contains generic enough functions that are reusable across other future components, let's say if we were to build out other graphs in the future, this folder is the central repository for commonly used functions

```

