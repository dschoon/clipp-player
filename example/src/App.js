import React, { Component } from 'react'
import ClippPlayer from 'clipp-player'
import playinwitme from './audio/playinwitme.mp3';

export default class App extends Component {
  render () {
    return (
      <div className={'container'}>
        <ClippPlayer src={playinwitme} />
      </div>
    )
  }
}
