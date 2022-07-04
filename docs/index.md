# Smartclide Design Pattern Selection
SmartCLIDE Design Pattern Selection Frontend Component

## Preconditions to build and run Design Pattern Selection Frontend

To build and run the frontend Design Pattern Selection extension of Theia, the following software is required:

- Python
- Node.js with visual studio build tools (this can be selected in the optional tools during the node.js installation or after hand in several ways, ex. with npm, or with visual studio installer)
- Yarn package manager npm install --global yarn

## How to build Design Pattern Selection Frontend

The Design Pattern Selection Frontend can be built using the following command:

```shell
yarn
```

## How to run Design Pattern Selection Frontend

After building the theia extension, you can start a local instance of theia with our extension.

### Running the browser example

```shell
yarn start:browser
```

*or:*

```shell
yarn rebuild:browser
cd browser-app
yarn start
```

*or:* launch `Start Browser Backend` configuration from VS code.

Open http://localhost:3000 in the browser.
