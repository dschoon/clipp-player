import React, { Component } from 'react'
import ClippPlayer from 'clipp-player'
import freestyle from './audio/freestyle.mp3';
import killshot from './audio/killshot.mp3';

export default class App extends Component {
  render () {
    return (
      <div className={'container'}>
        <ClippPlayer src={killshot} />
      </div>
    )
  }
}
