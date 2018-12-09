import React from 'react';
import PropTypes from 'prop-types';
import ClippWidget from './Components/ClippWidget/ClippWidget';

import styles from './styles.scss';


export default class ClippPlayer extends React.Component {
  static propTypes = {
    src: PropTypes.string
  };

  render() {
    const {
      text
    } = this.props;

    return (
      <div className={styles.clippPlayer}>
        <ClippWidget src={this.props.src} />
      </div>
    )
  }
}

ClippPlayer.defaultProps = {
  src: ""
};
