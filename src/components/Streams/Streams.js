import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CircularProgress from 'material-ui/CircularProgress';

import Header from '../Header/Header';

import { connect } from 'react-redux';
import { fetchGames } from '../../redux/actions/fetchGames';
import { fetchStreams } from '../../redux/actions/fetchStreams';

import './Streams.scss';

class Streams extends Component {

  componentWillMount() {

    // store the game ID from the react router params (/streams/gameID) to make dynamic fetching with this ID
    let gameId = this.props.match.params.gameId;
    this.props.fetchStreams(`https://api.twitch.tv/helix/streams?game_id=${gameId}&first=100`);
  }

  render() {

    const streams = this.props.streams.streams.data;
    let gameId = this.props.match.params.gameId;

    return (
      <div className="rightContent">


        {/* Before data is loaded... */}
        {!this.props.streams.fetched &&
          <CircularProgress />
        }

        <div>

          {/* When data is loaded... */}
          {this.props.streams.fetched &&
            <div className="streamsFirstContainer">
              <Header gameId={this.props.match.params.gameId} />
              <h4 className="channelTitle">TOUTES LES CHAÎNES</h4>
              <div className="streamsSecondContainer">
                {streams.map((stream, index) => {

                  let streamer = stream.thumbnail_url.slice(52).slice(0, -21);
                  let streamImage = stream.thumbnail_url.slice(0, -20) + "230x120.jpg";
                  let streamUrl = `/live/${gameId}/${streamer}`;

                  return (
                    <div key={index} className="streamCard">
                      <Link to={streamUrl}
                            params={{ gameId, streamer }}>
                        <img src={streamImage} alt={`${streamer} cover image`} />
                      </Link>
                      <Link to={streamUrl}
                            params={{ gameId, streamer }}>
                        <h3>{stream.title}</h3>
                      </Link>
                      <p>{stream.viewer_count} spectateurs sur {streamer}</p>
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
    streams: state.streamsReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStreams: (url) => { dispatch(fetchStreams(url)) }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Streams);