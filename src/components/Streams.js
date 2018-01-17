import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchStreams } from '../redux/actions/fetchStreams';

class Streams extends Component {

  async componentWillMount() {
    await this.props.fetchStreams('https://api.twitch.tv/helix/streams?game_id=21779');
  }

  render() { 

    const streams = this.props.streams.streams.data;

    return (
      <div>

        {!this.props.streams.fetched &&
          <p>Chargement ...</p>
        }

        {this.props.streams.fetched &&
          streams.map((stream, index) => {
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
              </div>
            )
          })
        }

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    streams: state.streamsReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStreams: (url) => { dispatch(fetchStreams(url)) }
  }
}

 
export default connect(mapStateToProps, mapDispatchToProps)(Streams);