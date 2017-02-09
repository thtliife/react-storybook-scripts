import { configure } from '@kadira/storybook'
import { setOptions } from '@kadira/storybook-addon-options'

setOptions({
  name: 'React Storybook',
  url: 'https://getstorybook.io',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: false,
  sortStoriesByKind: false,
})

function loadStories() {
  require('../src/stories')
}

configure(loadStories, module)
