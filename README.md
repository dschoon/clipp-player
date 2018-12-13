# ClippPlayer

An audio player widget with a waveform 

[![NPM](https://img.shields.io/npm/v/clipp-player.svg)](https://www.npmjs.com/package/clipp-player) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![CircleCI](https://circleci.com/gh/dschoon/clipp-player.svg?style=svg)](https://circleci.com/gh/dschoon/clipp-player)


![ClippPlayer](example/public/ClippPlayer.jpg)

#####Demo: https://dschoon.github.io/clipp-player/


## Install

```bash
npm install --save clipp-player
```

## Usage

```jsx
import React from 'react'

import ClippPlayer from 'clipp-player'
import mySong from './audio/mySong.mp3';

class App extends React.Component {
  render () {
    return (
      <ClippPlayer src="{mySong}" />
    )
  }
}
```

## License

MIT © [Dan Schoonmaker](https://danielschoonmaker.com) [(github)](https://github.com/dschoon)
