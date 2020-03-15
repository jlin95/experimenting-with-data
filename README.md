## Requirements to start playing around with this project

Make sure you have either npm or yarn installed. 

## Available Scripts

In the project directory, you can run:

### `yarn install && yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Some assumptions and considerations made

In this challenge, in the spirit of rapid prototyping, I started with using d3, but after toiling for a longer than expected time on dealing with d3 v5, I decided to go with an alternate library called Victory, where I could construct scatter plots much more quickly. 

A quick note to make as well was that I'd removed the first header in the csv - I recognize that at some point focusing too much time on stripping away the first row for csv parsing would take away precious time from actually coding up the visualizations. 

## How to interact with the UI

To start, the UI already loads 'Assay 0' by default. This brings up all the data points corresponding to Assay 0, and thereby Model for Assay 0 as well. 
To switch to view visualizations for another assay, simply use the dropdown located in the top left corner to view. 

To view the compounds' structure, Victory has this really neat feature that allows you to just drag over a certain area of the plot. 


