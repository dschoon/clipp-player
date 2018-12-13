import React from 'react'
import ClippPlayer from 'clipp-player'
import playinwitme from './audio/playinwitme.mp3';

export default class App extends React.Component {
  render () {
    return (
      <div className={'container'}>
        <ClippPlayer src={playinwitme} />
      </div>
    )
  }
}
