import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactWaves from '@dschoon/react-waves';

import pause from '../../assets/pause.png';
import play from '../../assets/play.png';

import styles from '../../styles.scss';


export default class ClippWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: props.isPlaying,
      time: 0,
      duration: props.initialDuration || 0,
    };
  }

  togglePlay = () => {
    if (this.props.togglePlay) {
      this.props.togglePlay();
    } else {
      this.setState({ isPlaying: !this.state.isPlaying });
    }
  };

  updateTimer = (currentTime, wavesurfer={}) => {
    const totalDuration = wavesurfer.getDuration();

    if (currentTime && !isNaN(currentTime)) {
      this.setState({ time: currentTime, duration: totalDuration });
    }
  };

  renderCounter = () => {
    let timeRemaining = Math.ceil(this.state.duration - this.state.time);

    if (this.state.duration && this.props.countStyle === 'UP') {
      timeRemaining = this.state.time;
    }

    const currentTime = moment.duration(timeRemaining, 'seconds');
    const time = moment(currentTime.asMilliseconds()).utc();

    if (this.state.duration > 3600 && currentTime.asSeconds() > 3600) {
      return time.format('h:mm:ss');
    }

    return moment(currentTime.asMilliseconds()).format('mm:ss');
  };

  getIsPlaying = () => {
    return !!this.props.isPlaying || !!this.state.isPlaying;
  };

  render() {
    const { src, audioPeaks, volume, zoom, options, btnStyle, counterStyle } = this.props;

    return (
      <div>
        <div className={ styles.button } onClick={ this.togglePlay } style={ btnStyle } >
          { this.getIsPlaying() ?
            <img src={pause} alt='pause'  /> :
            <img src={play} className={ styles.play } alt='play' />
          }
        </div>
        <div className={styles.inner}>
          <ReactWaves
            audioFile={src}
            audioPeaks={audioPeaks}
            className={styles.wave}
            options={{
              audioRate: options.audioRate,
              autoCenter: options.autoCenter,
              backend: audioPeaks ? 'MediaElement' : 'WebAudio',
              barGap: options.barGap,
              barWidth: options.barWidth,
              barHeight: options.barHeight,
              cursorColor: options.cursorColor,
              cursorWidth: options.cursorWidth,
              fillParent: options.fillParent,
              height: options.height,
              hideScrollbar: options.hideScrollbar,
              normalize: options.normalize,
              partialRender: options.partialRender,
              progressColor: options.progressColor,
              responsive: options.responsive || true,
              waveColor: options.waveColor
            }}
            volume={volume}
            zoom={zoom}
            playing={this.getIsPlaying()}
            onPosChange={this.updateTimer}
          />
        </div>
        <div className={ styles.counter } style={ counterStyle } >
          { this.renderCounter() }
        </div>
      </div>
    )
  }
}

ClippWidget.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  isPlaying: PropTypes.bool,
  togglePlay: PropTypes.func,
  audioPeaks: PropTypes.array,
  countStyle: PropTypes.oneOf(['DOWN', 'UP']),
  btnStyle: PropTypes.shape({
    color: PropTypes.string,
    background: PropTypes.string,
    border: PropTypes.string,
    borderRadius: PropTypes.string,
  }),
  counterStyle: PropTypes.shape({
    width: PropTypes.string,
    fontSize: PropTypes.string,
    margin: PropTypes.string,
  }),
  volume: PropTypes.number,
  zoom: PropTypes.number,
  options: PropTypes.object
};

ClippWidget.defaultProps = {
  src: '',
  countStyle: 'DOWN',
  btnStyle: {
    color: '#FFF',
    background: '',
    border: '0px solid #FFF',
    borderRadius: '30px',
  },
  counterStyle: {
    width: '5%',
    fontSize: '28px',
    margin: '8px 8px 0 0',
  },
  volume: 1,
  zoom: 1,
  initialDuration: 0,   // In seconds
  options: {
    audioRate: 1,
    autoCenter: true,
    backend: '',
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
    progressColor: '#49368B',
    responsive: true,
    waveColor: '#e1e5ea',
  }
};
