import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import backgrounds from 'react-storybook-addon-backgrounds'
import { withKnobs, text, boolean, number } from '@kadira/storybook-addon-knobs'
import withReadme from 'storybook-readme/with-readme'
import AddonDoco from '.'
import README from './README.md'

storiesOf('AddonDoco', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))
  .addDecorator(backgrounds([
    { name: 'twitter', value: '#00aced' },
    { name: 'facebook', value: '#3b5998' },
    { name: 'stack overflow', value: '#f57e35' },
  ]))
  .add('Links for Addons Documentation',
    () => ( <AddonDoco / >
  ))
