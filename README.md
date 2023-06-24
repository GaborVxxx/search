# Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


### `npm run format:C`

Use prettier to check if the code is in any file is matching the styles defined in 'package.json'

### `npm run format:F`

Use prettier to format the code to the styles defined in 'package.json'

# How to install gide

## Clone the repo to your local system and run 

### `npm install`

After installing the dependency`s all the commands are available for you from the previous section.

# App logic

The app is truly a single page app. The app manage 4 different state on the same page based on user action.

The data coming from the search input is the priority over the letters.
#### search bar > letter

### state 0
In this state the app don`t load any data. Consider this es error state.

### state 1
In this state the app only use the letter`s as option to search

### state 2
In this state the search bar is used by the user so each letter tab become a filter tab filtering the data by first letter.
The search bar will stay open and display all the possible options based on the text entered. So this way the user can filter the search date based on first letter.
This will display as long as there is more than one option in the data coming from the search bar.

### state 3
If there is only one option left in the search bar data the app will go to its last state and display a single item.

**Note: this way the user can look for cocktails starting with number not just letter.

# Dev quick nav in files

## Redux
search/src/app  <-- the store

search/src/features  <-- the reducers and actions

## Costume Hooks
search/src/hooks

## Major "TS" interfaces for the app
search/src/interfaces

## Components
search/src/components

## Semantic UI styling tool
search/src/semantic-ui


# Styling note

The app use a mix of technique to style the look. 

- Semantic UI base system
- scss files for costume scss classes and class overrides for Semantic UI




