import React from 'react';
import ReactDOM from 'react-dom';
import WaveSurfer from 'wavesurfer.js';


export default class Waveform extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.$el = ReactDOM.findDOMNode(this);
    this.$waveform = this.$el.querySelector('.wave');

    this.wavesurfer = WaveSurfer.create({
      container: this.$waveform,
      height: this.props.height,
      cursorWidth: this.props.cursorWidth,
      barWidth: this.props.barWidth,
      waveColor: this.props.waveColor,
      progressColor: this.props.progressColor,
      responsive: true,
      hideScrollbar: true,
      plugins: []
    });
    this.wavesurfer.load(this.props.src);

    this.wavesurfer.on('audioprocess', () => {
      let currentTime = Math.ceil(this.wavesurfer.getCurrentTime());

      if (currentTime !== this.props.time) {
        this.props.timerCallback(currentTime);
      }
    });
  }

  componentDidUpdate(newProps) {
    if (!newProps.isPlaying) {
      this.wavesurfer.playPause();
    }
  }

  componentWillUnmount() {
    this.wavesurfer.destroy();
  }

  render() {
    return (
      <div>
        <div className='waveform' onClick={this.props.toggleCallback}>
          <div className='wave'></div>
        </div>
      </div>
    )
  }
}

Waveform.defaultProps = {
  src: "",
  height: 50,
  cursorWidth: 0,
  barWidth: 2,
  waveColor: '#D1D6DA',
  progressColor: '#44BDB2',
  time: 0,
  isPlaying: false,
  toggleCallback: () => {},
  timerCallback: () => {}
};
