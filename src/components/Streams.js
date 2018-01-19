import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CircularProgress from 'material-ui/CircularProgress';

import Header from './Header';

import { connect } from 'react-redux';
import { fetchGames } from '../redux/actions/fetchGames';
import { fetchStreams } from '../redux/actions/fetchStreams';

import './Streams.scss';

class Streams extends Component {

  componentWillMount() {

    // store the game ID from the react router params (/streams/gameID) to make dynamic fetching with this ID
    let gameId = this.props.match.params.gameId;
    this.props.fetchStreams(`https://api.twitch.tv/helix/streams?game_id=${gameId}&first=100`);
    this.props.fetchGames();
  }

  render() {

    const streams = this.props.streams.streams.data;
    let gameId = this.props.match.params.gameId;

    return (
      <div>
        <Header gameId={this.props.match.params.gameId} />

        {/* Before data is loaded... */}
        {!this.props.streams.fetched &&
          <CircularProgress />
        }

        <div>

          {/* When data is loaded... */}
          {this.props.streams.fetched &&
            <div>
              <h4 className="channelTitle">TOUTES LES CHAÎNES</h4>
              <div className="streamsContainer">
                {streams.map((stream, index) => {

                  const streamer = stream.thumbnail_url.slice(52).slice(0, -21);
                  const streamImage = stream.thumbnail_url.slice(0, -20) + "230x120.jpg"

                  return (
                    <div key={index} className="streamCard">
                      <Link to={`/live/${gameId}/${streamer}`} params={{ gameId, streamer }}>
                        <img src={streamImage} alt={`${streamer} cover image`} />
                      </Link>
                      <Link to={`/live/${gameId}/${streamer}`}>
                        <h3>{stream.title}</h3>
                      </Link>
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
                })}
              </div>
            </div>
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