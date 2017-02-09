# react-storybook-scripts

This package includes scripts and configuration used by [Create React App](https://github.com/facebookincubator/create-react-app).  
Please refer to its documentation:

* [Getting Started](https://github.com/facebookincubator/create-react-app/blob/master/README.md#getting-started) – How to create a new app.
* [User Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) – How to develop apps bootstrapped with Create React App.

It will also setup and configure [react-storybook](https://getstorybook.io) for easy component testing.
Start the storybook dev server via
```bash
npm run storybook
```

Also included is a script to ease the createion of new components, which can be invoked via
```bash
npm run component
```

_the 'npm' command may be replace with 'yarnpkg' if you prefer to use yarn as your package manager_

Additionally, I have added support for css variables via postcss.

All css files created with the component script include a global stylesheet located at `src/lib/globals/style/globals.css` where variables may be defined.

## Installation
```bash
create-react-app my-awesome-app --scripts-version react-storybook-scripts
```

Enjoy.
