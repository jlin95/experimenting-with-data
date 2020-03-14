## Requirements

Make sure you have either npm or yarn installed. 

## Available Scripts

In the project directory, you can run:

### `yarn install && yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

## About the data set
Reverie Labs Coding Challenge Data Repo

This S3 bucket contains a single file called reverie_challenge_data.csv

------------------
Dataset info:
- Top two lines are headers. 
	- First header row indicates whether each column is a metadata column, an assay data column, or a model prediction column
	- Second header row indicates the name of the metadata column or assay. Note that we have given dummy names for the assays (assay_0 through assay_9)
- The "identifier" column gives you a unique ID for each compound.
- The "smiles" column gives you a string-based representation of a compound called a SMILES string. We use this representation internally to serialize compounds.