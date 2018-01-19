import React, { Component } from "react";

class LiveStream extends Component {
  render() {

    const streamer = this.props.location.pathname.slice(6);

    return (
      <div>
        <iframe
          style={{ width: "500px", height: "300px" }}
          src={`https://twitch.tv/${streamer}/embed`}
        />
        <iframe
          style={{ width: "300px", height: "500px" }}
          src={`https://twitch.tv/${streamer}/chat`}
        />
      </div>
    );
  }
}

export default LiveStream;
