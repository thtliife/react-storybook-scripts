const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

const jsxClass = (props) => `import React, { Component } from 'react'

import './${props.css}'

class ${props.name} extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="${props.class}">
        <p>
          To get started, edit <code>src/components/${props.name}/${props.jsx}</code> and save to reload.
        </p>
        {this.props.children}
      </div>
    )
  }
}

export default ${props.name}
`

const jsxFunction = (props) => `import React from 'react'

import './${props.css}'

const ${props.name} = (props) => (
  <div className="${props.class}">
    <p>
      To get started, edit <code>src/components/${props.name}/${props.jsx}</code> and save to reload.
    </p>
    {props.children}
  </div>
)

export default ${props.name}
`

const css = (props) => `@import '${props.globalCss}';

.${props.class} {
/* Put your css here... */
}
`

const indexReact = (props) => `import ${props.name} from './${props.baseName}-component'
export { ${props.name} as default }
`

const indexStorybook = (props) => `import ${props.name} from './${props.baseName}-component'
import ${props.name}Stories from './${props.baseName}-stories'
export { ${props.name} as default, ${props.name}Stories }
`
const storyFile = (props) => `import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import backgrounds from 'react-storybook-addon-backgrounds'
import { withKnobs, text, boolean, number } from '@kadira/storybook-addon-knobs'
import withReadme from 'storybook-readme/with-readme'
import ${props.name} from '.'
import README from './README.md'

storiesOf('${props.name}', module)
  .addDecorator(withReadme(README))
  .addDecorator(withKnobs)
  .addDecorator(backgrounds([
    { name: 'twitter', value: '#00aced' },
    { name: 'facebook', value: '#3b5998' },
    { name: 'stack overflow', value: '#f57e35' },
  ]))
  .add('renders ${props.name}', () => (
    <${props.name}><p>This is where ${props.name}'s child nodes would render</p></${props.name}>
  ))
`

const readMe = (props) => `# ${props.name}

A short description of the ${props.name} component.
`

const importStatement = (props) => `import './${props.name}'
`

const questions = [
  {
    name: 'name',
    type: 'input',
    message: 'What would you like to call this component?'
  },
  {
    name: 'type',
    type: 'list',
    message: 'What type of component would you like to create?',
    choices: [
      {
        name: 'A class based component',
        value: 'jsxClass',
        short: 'Class component'
      },
      {
        name: 'A functional component',
        value: 'jsxFunction',
        short: 'Functional component'
      }
    ]
  },
  {
    name: 'compOrStory',
    type: 'list',
    message: 'Do you want to create this component as a react storybook story or a standard react component?',
    choices: [
      {
        name: 'A standard react component',
        value: 'React',
        short: 'React component'
      },
      {
        name: 'A react storybook story',
        value: 'Storybook',
        short: 'Storybook story'
      }
    ]
  }
]

const createFile = (content, filePath, fileName, componentName, isStory) => {
  let logFileName = isStory ? `stories/${componentName}/${fileName}` : `modules/${componentName}/${fileName}`
  
  fs.outputFile(path.resolve(filePath, fileName), content, (err) => {
    if (err) {
      console.error(chalk.red(`❌  Failed to write file: ${logFileName}`))
      console.error(chalk.red(`   ${err}`))
      process.exit(2)
    }
    console.info(`✅  ${logFileName}`)
  })
}

const appendFile = (content, filePath, fileName, isStory) => {
  let logFileName = isStory ? `stories/${fileName}` : `modules/${fileName}`
  
  fs.appendFile(path.resolve(filePath, fileName), content, (err) => {
    if (err) {
      console.error(chalk.red(`❌  Failed to append file: ${logFileName}`))
      console.error(chalk.red(`   ${err}`))
      process.exit(2)
    }
    console.info(`✅  ${logFileName}`)
  })
}

const camelize = (str, capFirst) => str.replace(/[-_,.]/g, ' ').replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => (!capFirst && index === 0) ? letter.toLowerCase() : letter.toUpperCase()).replace(/\s+/g, '')

const unCamelize = (str, capFirst) => str.replace(/[_,. ]/g, '-').replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => (capFirst && index === 0) ? letter.toUpperCase() : letter.toLowerCase()).replace(/\s+/g, '-')


module.exports = {
  templates: {
    jsxClass: jsxClass,
    jsxFunction: jsxFunction,
    css: css,
    indexReact: indexReact,
    indexStorybook: indexStorybook,
    storyFile: storyFile,
    readMe: readMe,
    importStatement: importStatement
  },
  questions: questions,
  createFile: createFile,
  appendFile: appendFile,
  camelize: camelize,
  unCamelize: unCamelize
}
