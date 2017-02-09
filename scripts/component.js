const inquirer = require('inquirer')
const fs = require('fs-extra')
const path = require('path')
const paths = require('../config/paths')
const chalk = require('chalk')
const componentUtils = require('../config/component-utils')

inquirer.prompt(componentUtils.questions).then((answers) => {
  const componentName = componentUtils.camelize(answers.name, true)
  const fileBaseName = componentUtils.camelize(answers.name)
  const cssClass = componentUtils.unCamelize(answers.name)

  const componentPath = answers.compOrStory === 'Storybook' ? path.resolve(paths.storybook, componentName) : path.resolve(paths.appSrc, 'modules', componentName)

  const outputFiles = [
    {
      content: componentUtils.templates[answers.type]({css: `${fileBaseName}-style.css`, name: componentName, class: cssClass, jsx: `${fileBaseName}-component.jsx`}),
      name: `${fileBaseName}-component.jsx`,
    },
    {
      content: componentUtils.templates.css({globalCss: path.relative(componentPath, paths.appCssGlobal), class: cssClass}),
      name: `${fileBaseName}-style.css`
    },
    {
      content: componentUtils.templates[`index${answers.compOrStory}`]({name: componentName, baseName: fileBaseName}),
      name: 'index.js'
    },
    {
      content: componentUtils.templates.storyFile({name: componentName}),
      name: `${fileBaseName}-stories.js`,
      skip: answers.compOrStory === 'React'
    },
    {
      content: componentUtils.templates.readMe({name: componentName}),
      name: 'README.md'
    }
  ]

  if (fs.existsSync(componentPath)) {
    console.error(chalk.red(`❌  Cannot create module '${componentName}'. A component folder with that name already exists.`))
    process.exit(3)
  }

  let fileCount = outputFiles.length;
  for (let i = 0; i < fileCount; i++) {
    const thisFile = outputFiles[i]
    if (!thisFile.skip) componentUtils.createFile(thisFile.content, componentPath, thisFile.name, componentName, answers.compOrStory === 'Storybook')
  }
  
  const makeStory = answers.compOrStory === 'Storybook'
  if (makeStory) componentUtils.appendFile(componentUtils.templates.importStatement({name: componentName}), paths.storybook, 'index.js', true)
})
