import React from 'react'
import ClippPlayer from 'clipp-player'
import playinwitme from './audio/playinwitme.mp3';

export default class App extends React.Component {
  render () {
    return (
      <div className={'container'}>
        <ClippPlayer
          className={''}
          src={playinwitme}
          btnStyle={{
            color: '#FFF',
            background: '#49368B',
            border: '0px solid #FFF',
            borderRadius: '30px',
          }}
          counterStyle={{
            width: '3%',
            fontSize: '28px',
            margin: '8px 8px 0 0',
            color: '#49368B',
          }}
          volume={1}
          zoom={1}
          options={{
            audioRate: 1,
            autoCenter: false,
            barGap: 1,
            cursorColor: '#FFF',
            cursorWidth: 1,
            fillParent: true,
            height: 50,
            hideScrollbar: true,
            normalize: true,
            partialRender: true,
            progressColor: '#49368B',
            responsive: true,
            waveColor: '#e1e5ea',
          }}
        />
      </div>
    )
  }
}
