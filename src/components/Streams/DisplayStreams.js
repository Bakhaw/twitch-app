import React, { Component } from 'react';

import Streams from './Streams';

class DisplayStreams extends Component {
  render() {
    return (
      <div>
        <Streams {...this.props} />
      </div>
    )
  }
}

export default DisplayStreams;