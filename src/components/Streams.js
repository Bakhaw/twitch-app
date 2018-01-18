import React, { Component } from 'react';

import CircularProgress from 'material-ui/CircularProgress';

import { connect } from 'react-redux';
import { fetchGames } from '../redux/actions/fetchGames';
import { fetchStreams } from '../redux/actions/fetchStreams';

import './Streams.scss';

class Streams extends Component {

  componentWillMount() {

    // store the game ID from the url (/streams/gameID) to make dynamic fetching with this ID
    const gameId = this.props.location.pathname.slice(9);

    this.props.fetchStreams(`https://api.twitch.tv/helix/streams?game_id=${gameId}&first=100`);
    this.props.fetchGames();
  }

  render() {

    const streams = this.props.streams.streams.data;

    return (
      <div>

        {/* Before data is loaded... */}
        {!this.props.streams.fetched &&
          <CircularProgress />
        }

        {/* Game Title */}
        {this.props.games.games.map((game, index) => {
          return (
            <div key={index}>
              {game.id === this.props.location.pathname.slice(9) &&
                <div style={{
                     background: `url(${game.box_art_url.slice(0, -21)}.jpg) center no-repeat`,
                     backgroundSize: '100%',
                     height: '180px'
                     }}>
                  <h1>{game.name}</h1>                
                </div>
              }
            </div>
          )
        })}

        <div className="streamsContainer">

          {/* When data is loaded... */}
          {this.props.streams.fetched &&
            streams.map((stream, index) => {
              const streamer = stream.thumbnail_url.slice(52).slice(0, -21);
              const streamImage = stream.thumbnail_url.slice(0, -20) + "230x120.jpg"
              return (
                <div key={index} className="streamCard">
                  <a href={`https://www.twitch.tv/${streamer}`} target="_blank">
                    <img src={streamImage} alt={`${streamer} cover image`} />
                  </a>
                  <a href={`https://www.twitch.tv/${streamer}`} target="_blank"><h3>{stream.title}</h3></a>
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