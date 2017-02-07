import React, { Component } from 'react'

import Header from '../Header'
import Intro from '../Intro'


// import { db } from '../../lib/db'

import './app-style.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="app">
        <Header />
        <Intro />
      </div>
    )
  }
}

export default App
