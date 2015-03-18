# Sheets

Spreadsheet implementation using ES6, React.js and Immutable.js. Transpiled with Babel. Uses cursors to maintain a global state. Inspired by [David Nolens The Functional Final Frontier](http://www.infoq.com/presentations/om-clojurescript-facebook-react)

### Basic usage

Install dependancies via `npm`:

`npm install`

You'll need Babel installed globally:

`npm install --global babel`

Build and run:

`npm start`

Application should be available at:

`http://localhost:5000/`

### To do:

#### Spreadsheet layout

  - [x] Add row cells
  - [ ] Add column cells
  - [ ] Cell input editor
  - [ ] Cell bg colors

#### Spreadsheet Interactions

  - [x] Multi cell select
  - [ ] Column select
  - [ ] Row select
  - [ ] Cell merging

#### Custom expressions

- [x] Implement safe eval with Jexl
- [ ] Store Jexl expressions in cell value and eval on render
- [ ] Reference other cells
- [ ] Expression editor

#### Toolbar

- [x] Text styling options
- [ ] Togglable styles
- [ ] Font selector
- [ ] Font size
