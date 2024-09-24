# SpaceTraders

A simple web application using the spacetraders.io api into a basic, interactable UI.
A new user can be registered, the information of the user (the agent) can be seen, and then the starting location can be viewed along with some extra information about the contract given at the start of the game.
The application was completely test driven with vitest.

![Screenshot]() // GET A SCREENSHOT AT THE END

## Table of Contents

- [SpaceTraders](#spacetraders)
  - [Table of Contents](#table-of-contents)
  - [Installation and Usage](#installation-and-usage)
  - [Tests](#tests)
  - [Design Choices and Future Thoughts](#design-choices-and-future-thoughts)

## Installation and Usage

Make sure that the following are installed for this project:

- **Node.js and npm**
- Visit the official Node.js website (<https://nodejs.org>) and download the latest LTS (Long Term Support) version for your operating system.
- Once downloaded, run the installer and follow the on-screen instructions to complete the installation.
- After installation, you can verify that Node.js and npm are installed by running `node -v` and `npm -v` in your terminal or command prompt.

- run `npm ci` to install dependencies from package.json
- `npm run dev` and navigate to <http://localhost:5173/> in your preferred browser

## Tests

from the main `stqs-main` folder, and then run

`npm test`

- to run vitest and the tests

## Design Choices and Future Thoughts

Learning from some previous mistakes on personal projects, I took time at the beginning to properly look through the examples on the SpaceTraders website, play the game, read through the starter code, and plan out tests.

I made the choice to test drive the application, as previous experience from Makers and from a successful project showed that it meant that proper planning was done for features, edge cases are thought of, and generally creates a satisfying process.

As per the instructions, I worked through as much of the quickstart as time allowed, with a focus on creating a robust vertical slice application, that is tested, intuitive to navigate through, and easy on api calls. I used TailwindCSS for styling as I have found this easy to learn, read and implement across a number of projects. If I had more time, I would have liked to do more styling, though having it work feels to be the most important at the beginning.

I would have also liked to add some testing with an automation tool such as Cypress, as I have played around with these before and would have liked to improve my skills with an automation tool, simulate a user interaction, and also because it was quite fun and satisfying to see the program go through a set of actions.
