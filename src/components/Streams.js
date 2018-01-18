import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchGames } from '../redux/actions/fetchGames';
import { fetchStreams } from '../redux/actions/fetchStreams';

import './Streams.scss';

class Streams extends Component {

  async componentWillMount() {
    const gameId = this.props.location.pathname.slice(9);

    await this.props.fetchGames();
    await this.props.fetchStreams(`https://api.twitch.tv/helix/streams?game_id=${gameId}&first=100`);
  }

  render() {

    const streams = this.props.streams.streams.data;

    return (
      <div>

        {!this.props.streams.fetched &&
          <p>Chargement ...</p>
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
                  <p>{stream.title}</p>
                  <p>{stream.viewer_count} spectateurs sur {streamer}</p>

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
    games: state.gamesReducer,
    streams: state.streamsReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGames: () => { dispatch(fetchGames()) },
    fetchStreams: (url) => { dispatch(fetchStreams(url)) }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Streams);