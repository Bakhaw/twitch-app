import React, { Component } from 'react';

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() { 
    return (
      <div>
        <iframe src="https://player.twitch.tv/?video=221742982"
                frameBorder="0"
                height={200}
                width={250} />
      </div>
    )
  }
}
 
export default Video;