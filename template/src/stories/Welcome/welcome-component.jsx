import React from 'react'
import'./welcome-style.css'



export default class Welcome extends React.Component {
  showApp(e) {
    e.preventDefault()
    if(this.props.showApp) this.props.showApp()
  }

  render() {
    return (
      <div className="main">
        <h1>Welcome to STORYBOOK</h1>
        <p>
          This is a UI component dev environment for your app.
        </p>
        <p>
          We've added some basic stories inside the <code className="code">src/stories</code> directory.
          <br/>
          A story is a single state of one or more UI components. You can have as many stories as you want.
          <br/>
          (Basically a story is like a visual test case.)
        </p>
        <p>
          See these sample <a className="link" href='#' onClick={this.showApp.bind(this)}>stories</a> for a component called <code className="code">Button</code>.
        </p>
        <p>
          Just like that, you can add your own components as stories.
          <br />
          You can also edit those components and see changes right away.
          <br />
          (Try editing the <code className="code">Button</code> component
          located at <code className="code">src/stories/Button.js</code>.)
        </p>
        <p>
          This is just one thing you can do with Storybook.
          <br/>
          Have a look at the <a className="link" href="https://github.com/kadirahq/react-storybook" target="_blank">React Storybook</a> repo for more information.
        </p>
      </div>
    )
  }
}
