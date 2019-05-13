import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactWaves from '@dschoon/react-waves';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

import styles from '../../styles.scss';


export default class ClippWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      time: 0,
      duration: 0,
    };
  }

  togglePlay = () => {
    this.setState({ isPlaying: !this.state.isPlaying });
  };

  updateTimer = (currentTime, wavesurfer={}) => {
    const totalDuration = wavesurfer.getDuration();

    if (currentTime && Number.isInteger(currentTime)) {
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

    if (this.state.duration > 3600) {
      return time.format('h:mm:ss');
    }

    return moment(currentTime.asMilliseconds()).format('mm:ss');
  };

  render() {
    const { src, volume, zoom, options, btnStyle, counterStyle } = this.props;
    const {
      audioRate,
      autoCenter,
      barGap,
      barWidth,
      cursorColor,
      cursorWidth,
      fillParent,
      height,
      hideScrollbar,
      normalize,
      partialRender,
      progressColor,
      responsive,
      waveColor
    } = options;

    return (
      <div>
        <div className={ styles.button } onClick={ this.togglePlay } style={ btnStyle } >
          { this.state.isPlaying ?
            <FontAwesomeIcon icon={faPause}  /> :
            <FontAwesomeIcon icon={faPlay} className={ styles.play } />
          }
        </div>
        <div className={styles.inner}>
          <ReactWaves
            audioFile={src}
            className={styles.wave}
            options={{
              audioRate: audioRate,
              autoCenter: autoCenter,
              barGap: barGap,
              barWidth: barWidth,
              cursorColor: cursorColor,
              cursorWidth: cursorWidth,
              fillParent: fillParent,
              height: height,
              hideScrollbar: hideScrollbar,
              normalize: normalize,
              partialRender: partialRender,
              progressColor: progressColor,
              responsive: responsive,
              waveColor: waveColor
            }}
            volume={volume}
            zoom={zoom}
            playing={this.state.isPlaying}
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
  options: {
    audioRate: 1,
    autoCenter: false,
    barGap: 1,
    barWidth: 1.2,
    cursorColor: '#FFF',
    cursorWidth: 0,
    fillParent: true,
    height: 50,
    hideScrollbar: true,
    normalize: true,
    partialRender: true,
    progressColor: '#1992BB',
    responsive: true,
    waveColor: '#D1D6DA',
  }
};
