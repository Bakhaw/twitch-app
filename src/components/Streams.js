import React, { Component } from 'react';

import CircularProgress from 'material-ui/CircularProgress';

import { connect } from 'react-redux';
import { fetchStreams } from '../redux/actions/fetchStreams';

import './Streams.scss';

class Streams extends Component {

  componentWillMount() {

    const gameId = this.props.location.pathname.slice(9);

    this.props.fetchStreams(`https://api.twitch.tv/helix/streams?game_id=${gameId}&first=100`);
  }

  render() {

    const streams = this.props.streams.streams.data;

    return (
      <div>

        {!this.props.streams.fetched &&
          <CircularProgress />
        }

        <div className="streamsContainer">
          {this.props.streams.fetched &&
            streams.map((stream, index) => {
              const streamer = stream.thumbnail_url.slice(52).slice(0, -21);
              const streamImage = stream.thumbnail_url.slice(0, -20) + "350x180.jpg"
              return (
                <div key={index} className="streamCard">
                  <a href={`https://www.twitch.tv/${streamer}`} target="_blank">
                    <img src={streamImage} alt={`${streamer} cover image`} />
                  </a>
                  <h4>{stream.title}</h4>
                  <p>{stream.viewer_count} spectateurs sur {streamer}</p>
                  <p>{stream.type.toUpperCase()}</p>
                  {/* <p>Streamer: {streamer}</p>
                  <p>Game ID #{stream.game_id}</p>
                  <p>Stream ID #{stream.id}</p>
                  <p>User ID: #{stream.user_id}</p>
                  <p>Language: {stream.language}</p>
                  <p>Started at: {stream.started_at}</p>
                  <p>Type: {stream.type}</p> */}

                </div>
              )
            })
          }
        </div>

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