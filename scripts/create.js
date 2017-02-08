const inquirer = require('inquirer')
const fs = require('fs-extra')
const path = require('path')
const paths = require('../config/paths')
const chalk = require('chalk')
const editer = require('editer')

const camelize = (str, capFirst) => str.replace(/[-_,.]/g, ' ').replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => (!capFirst && index === 0) ? letter.toLowerCase() : letter.toUpperCase()).replace(/\s+/g, '')
const unCamelize = (str, capFirst) => str.replace(/[_,. ]/g, '-').replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => (capFirst && index === 0) ? letter.toUpperCase() : letter.toLowerCase()).replace(/\s+/g, '-')

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
        value: 'class',
        short: 'Class component'
      },
      {
        name: 'A functional component',
        value: 'functional',
        short: 'Functional component'
      }
    ]}
]

if (fs.existsSync(path.resolve(paths.appSrc, '..', 'stories'))) {
  questions.push(
    {
      name: 'makeStory',
      type: 'confirm',
      message: 'A \'stories\' folder exists in your project.\n  Do you want to create this component as a react storybook story (y)\n  or a standard react component (n)?',
      default: false
    }
  )
}

inquirer.prompt(questions).then((answers) => {
  const componentName = camelize(answers.name, true)
  const fileBaseName = camelize(answers.name)
  const cssClass = unCamelize(answers.name)

  const componentPath = answers.makeStory ? path.resolve(paths.appSrc, '..', 'stories', componentName) : path.resolve(paths.appSrc, 'modules', componentName)

  const componentJSX = `${fileBaseName}-component.jsx`
  const componentCSS = `${fileBaseName}-style.css`

  const componentIndex = 'index.js'

  const jsxTypes = {
    class: `import React, { Component } from 'react'

import './${componentCSS}'

class ${componentName} extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="${cssClass}">
        <p>
          To get started, edit <code>src/components/${componentName}/${componentJSX}</code> and save to reload.
        </p>
        {props.children}
      </div>
    )
  }
}

export default ${componentName}
`,
    functional: `import React from 'react'

import './${componentCSS}'

const ${componentName} = (props) => (
  <div className="${cssClass}">
    <p>
      To get started, edit <code>src/components/${componentName}/${componentJSX}</code> and save to reload.
    </p>
    {props.children}
  </div>
)

export default ${componentName}
`
  }

  const globalCssPath = answers.makeStory ? '../../src/lib/globals/style/colors.css' : '../../lib/globals/style/colors.css'
  const outputCss = `@import '${globalCssPath}';

.${cssClass} {
  /* Put your css here... */
}
`

  const outputIndex = `import ${componentName} from './${fileBaseName}-component'
export { ${componentName} as default }
`

  const outputJSX = jsxTypes[answers.type.toLowerCase()]

  const createFile = (content, filePath, fileName, isStory) => {
    let logFileName = fileName
    if (isStory) {
      logFileName = `stories/${fileName}`
      const importOptions = {
        after: {
          regex: /import.+\n/g,
          last: true
        },
        asNewLine: true
      }
      
      const storyOptions = {
        after: {
          regex: /\n/g,
          last: true
        },
        asNewLine: true
      }
      
      try {
        const data = fs.readFileSync(path.resolve(filePath, fileName), 'utf8')
        const result = editer.insert(`import ${componentName} from './${componentName}'`, data, importOptions)
        
        const outputStory = `
storiesOf('${componentName}', module)
  .add('renders ${componentName}', () => (
    <${componentName} />
  ))
`
        content = editer.insert(outputStory, result, storyOptions)
      } catch(err) {
        if (err) {
          console.log(err)
          process.exit(4)
        }
      }
    }
    
    fs.outputFile(path.resolve(filePath, fileName), content, (err) => {
      if (err) {
        console.error(chalk.red(`❌  Failed to write file: ${logFileName}`))
        console.error(chalk.red(`   ${err}`))
        process.exit(2)
      }
      console.info(`✅  ${logFileName}`)
    })
  }

  if (fs.existsSync(componentPath)) {
    console.error(chalk.red(`❌  Cannot create module '${componentName}'. A component folder with that name already exists.`))
    process.exit(3)
  }
  
  createFile(outputJSX, componentPath, componentJSX)
  createFile(outputCss, componentPath, componentCSS)
  createFile(outputIndex, componentPath, componentIndex)
  if (answers.makeStory) {
  const storyFilePath = path.resolve(paths.appSrc, '..', 'stories')
    const storyIndex = 'index.js'
    createFile(undefined, storyFilePath, storyIndex, true)
  }
})
