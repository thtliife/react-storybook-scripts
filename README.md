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

Also included is a script to ease the creation of new components, which can be invoked via
```bash
npm run component
```

_the 'npm' command may be replace with 'yarnpkg' if you prefer to use yarn as your package manager_

Additionally, I have added support for css variables and css rule nesting via postcss.
eg: 
```css
.button {
  border: 1px solid $primary;
  border-radius: 3px;
  background-color: $lightPrimary;
  cursor: pointer;
  font-size: 15;
  padding: 3px 10px;
  margin: 10px;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:hover {
    border: 1px solid $lightPrimary;
    background-color: $primary;
    color: $textLightPrimary;
  }
}

```

All css files created with the component script include a stylesheet located at `src/lib/variables.css` where variables may be defined.

## Installation
```bash
create-react-app my-awesome-app --scripts-version react-storybook-scripts
```

Enjoy.
