# Technical Test: WeatherSnap2.0

## Table of Contents

1. [Description](#description)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Running the Application](#running-the-application)
6. [Building the Application](#building-the-application)
7. [License](#license)

## Description

Technical Test: A web application developed in ReactTs with Vite and Sass, that queries a weather service and displays the result in the language selected by the user.

## Features

- Sidebar with the following options: Home, Cities (dropdown), and Form.

- Displays current weather conditions for six cities: London, Toronto, Singapore, Madrid, Tokyo and Berlin.

- Displays the forecasts from 3 hours up to a maximum of 12 hours.

- Section Discover: displays city thumbnails with pagination and redirects you to the weather forecast for the selected city.

- Contact Form with the following fields: Name, Date of Birth, City, Email, and Phone Number.

- The form includes two buttons: one to Reset the data and another to Check if the information has been entered.

- English (default) and Spanish, highlight the selected language.

## Technologies Used

List of the main technologies and libraries used in the project.

- **[ReactTS](https://es.react.dev)**: TypeScript library for building user interfaces.
- **[Vite](https://vitejs.dev)**: Is a build tool that aims.
- **[React Router](https://reactrouter.com)**: Library for routing in React applications.
- **[Redux](https://redux.js.org)**: A state management library for managing the application state.
- **[Sass](https://sass-lang.com)**: Is a stylesheet language that’s compiled to CSS.
- **[Webpack](https://webpack.js.org)**: A static module bundler for JavaScript applications.
- **[Babel](https://babeljs.io)**: A JavaScript compiler that lets you use next-generation JavaScript, today.
- **[Lingui](https://lingui.dev)**: React library for internalization (i18n).
- **[Weather API](https://openweathermap.org/api)**: Open Weather Api to check the weather data.
- **[Jest](https://jestjs.io)**: Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
- **[React Testing Library](https://testing-library.com)**: Simple and complete testing utilities that encourage good testing practices.

## Installation

1. Clone the repository:

### `git clone https://github.com/JMTM7/weathersnap.git`

2. Install dependencies:

### `npm install`

## Running the Application

To start the application locally:

### `npm start`

This command will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Building the Application

To build the app for production:

### `npm run build`

his will create a `build` directory with the production build of your app. The build is optimized and the filenames include hashes for caching purposes.

## License

This project is licensed under the MIT License - see the [`LICENSE`](./LICENSE) file for details.
