import React from 'react';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

import styles from '../../styles.scss';
import Waveform from "../Waveform/Waveform";


export default class ClippWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      time: 0,
    };

    this.togglePlay = this.togglePlay.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.renderCounter = this.renderCounter.bind(this);
  }

  togglePlay() {
    this.setState({ isPlaying: !this.state.isPlaying });
  }

  updateTimer(currentTime) {
    if (currentTime && Number.isInteger(currentTime)) {
      this.setState({time: currentTime});
    }
  }

  renderCounter() {
    let duration = moment.duration(this.state.time, 'seconds');
    return moment(duration.asMilliseconds()).format('mm:ss');
  }

  render() {
    return (
      <div>
        <div className={ styles.button } onClick={this.togglePlay} >
          { this.state.isPlaying ?
            <FontAwesomeIcon icon={faPause}  /> :
            <FontAwesomeIcon icon={faPlay} className={ styles.play } />
          }
        </div>
        <div className={styles.inner}>
          <Waveform src={this.props.src}
                    time={this.state.time}
                    isPlaying={this.state.isPlaying}
                    toggleCallback={this.togglePlay}
                    timerCallback={this.updateTimer} />
        </div>
        <div className={ styles.counter }>
          { this.renderCounter() }
        </div>
      </div>
    )
  }
}

ClippWidget.defaultProps = {
  src: ""
};
