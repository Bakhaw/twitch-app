import React, { Component } from 'react';
import axios from 'axios';
import config from '../key';

class Streams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: [],
      fetched: false
    };
  }

  async componentWillMount() {
    const fetch = await axios.get('https://api.twitch.tv/helix/streams?game_id=21779', config);
    const streams = await fetch.data.data;
    this.setState({ streams, fetched: true })
  }

  render() { 
    return (
      <div>
        
        {!this.state.fetched &&
          <p>Chargement ...</p>
        }

        {this.state.fetched &&
          this.state.streams.map((stream, index) => {
            return (
              <div key={index}>
                {console.log(stream)}            
                <p>Game ID #{stream.game_id}</p>
                <p>Stream ID #{stream.id}</p>
                <p>User ID: #{stream.user_id}</p>
                <p>Language: {stream.language}</p>
                <p>Started at: {stream.started_at}</p>
                <p>Title: {stream.title}</p>
                <p>Type: {stream.type}</p>
                <img src={stream.thumbnail_url.slice(0, -21)+"-750x500.jpg"} alt=""/>
                <p>Viewers: {stream.viewer_count}</p>
                <p>stream.id</p>
              </div>
            )
          })
        }

      </div>
    )
  }
}
 
export default Streams;