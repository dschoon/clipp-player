import React from 'react'
import ClippPlayer from 'clipp-player'
import playinwitme from './audio/playinwitme.mp3';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false
    }
  }

  togglePlay = () => {
    this.setState({ isPlaying: !this.state.isPlaying })
  };

  render () {
    return (
      <div className={'container'}>
        <ClippPlayer
          className={''}
          src={playinwitme}
          isPlaying={this.state.isPlaying}
          togglePlay={this.togglePlay}
          initialDuration={192}
          btnStyle={{
            color: '#FFF',
            background: 'rgb(129, 116, 239)',
            border: '0px solid #FFF',
            borderRadius: '30px',
          }}
          counterStyle={{
            width: '3%',
            fontSize: '28px',
            margin: '8px 8px 0 0',
            color: 'rgb(129, 116, 239)',
          }}
          volume={1}
          zoom={.1}
          options={{
            audioRate: 1,
            autoCenter: true,
            barGap: 1,
            barWidth: 3,
            barHeight: 5,
            cursorColor: '#FFF',
            cursorWidth: 1,
            fillParent: true,
            height: 100,
            hideScrollbar: false,
            normalize: true,
            partialRender: true,
            progressColor: 'rgb(129, 116, 239)',
            responsive: true,
            waveColor: '#e1e5ea',
          }}
        />
      </div>
    )
  }
}
