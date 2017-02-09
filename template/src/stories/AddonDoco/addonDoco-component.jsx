import React from 'react'

import './addonDoco-style.css'

const AddonDoco = (props) => (
  <div className="addon-doco">
    <h1>STORYBOOK Addon Doco</h1>
    Here are some links for all the documentation required to take advantage of this storybook implementation and its addons...
    <div className="addon-doco-links">
      <ul>
        <li><h3><a className="link" href="https://getstorybook.io/docs/react-storybook">Main StoryBook Documentation</a></h3></li>
        <li><strong>Default installed addons</strong>
          <ul>
            <li>Addon: <a className="link" href="https://github.com/storybooks/storybook-addon-actions/blob/master/README.md">Actions</a></li>
            <li>Addon: <a className="link" href="https://github.com/storybooks/storybook-addon-links/blob/master/README.md">Links</a></li>
          </ul>
        </li>
        <li><strong>Third Party addons</strong>
          <ul>
            <li>Addon: <a className="link" target="_blank" href="https://github.com/NewSpring/react-storybook-addon-backgrounds/blob/master/README.md">Backgrounds</a></li>
            <li>Addon: <a className="link" target="_blank" href="https://github.com/philcockfield/storybook-host/blob/master/README.md">Host</a></li>
            <li>Addon: <a className="link" target="_blank" href="https://github.com/joscha/storybook-addon-i18n-tools/blob/master/README.md">i18n Tools</a></li>
            <li>Addon: <a className="link" target="_blank" href="https://github.com/storybooks/react-storybook-addon-info/blob/master/README.md">Info</a></li>
            <li>Addon: <a className="link" target="_blank" href="https://github.com/storybooks/storybook-addon-knobs/blob/master/README.md">Knobs</a></li>
            <li>Addon: <a className="link" target="_blank" href="https://github.com/sm-react/storybook-addon-material-ui/blob/master/README.md">Material UI</a></li>
            <li>Addon: <a className="link" target="_blank" href="https://github.com/storybooks/storybook-addon-notes/blob/master/README.md">Notes</a></li>
            <li>Addon: <a className="link" target="_blank" href="https://github.com/storybooks/storybook-addon-options/blob/master/README.md">Options</a></li>
            <li>Addon: <a className="link" target="_blank" href="https://github.com/evgenykochetkov/react-storybook-addon-props-combinations/blob/master/README.md">Props Combinations</a></li>
            <li>Addon: <a className="link" target="_blank" href="https://github.com/tuchk4/storybook-readme/blob/master/README.md">README</a></li>
            <li>Addon: <a className="link" target="_blank" href="https://github.com/mthuret/storybook-addon-specifications/blob/master/README.md">Spec</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
)

export default AddonDoco
