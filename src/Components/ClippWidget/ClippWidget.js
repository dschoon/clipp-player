import React from 'react';
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
          <ReactWaves
            audioFile={this.props.src}
            className={styles.wave}
            options={{
              barWidth: 2,
              cursorWidth: 0,
              height: 50,
              hideScrollbar: true,
              progressColor: '#44BDB2',
              responsive: true,
              waveColor: '#D1D6DA'
            }}
            volume={1}
            zoom={1}
            playing={this.state.isPlaying}
            onPosChange={this.updateTimer}
          />
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
