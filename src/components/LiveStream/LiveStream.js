import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGames } from "../../redux/actions/fetchGames";
import { fetchStreams } from "../../redux/actions/fetchStreams";

import  './LiveStream.scss';

class LiveStream extends Component {
  componentWillMount() {
    // store the game ID from react router params (/live/gameId) to make dynamic fetching with this ID
    let userId = this.props.match.params.userId;
    this.props.fetchStreams(
      `https://api.twitch.tv/helix/streams?user_id=${userId}`
    );
    this.props.fetchGames();
  }

  render() {
    let streamer = this.props.match.params.streamer;
    let gameId = this.props.match.params.gameId;

    let videoPlayerUrl = `https://twitch.tv/${streamer}/embed`;
    let chatUrl = `https://twitch.tv/${streamer}/chat`;

    return (
      <div className="liveStreamContainer">

        <div className="leftMenu"></div>

        {/* Video Player */}
        <div className="videoPlayer">
          <iframe
            width={800}
            height={450}
            allowFullScreen
            src={videoPlayerUrl}
          />

          {/* STREAM DATA (TITLE, VIEWERS) */}
          {this.props.streams.fetched &&
            this.props.streams.streams.data.map((stream, index) => {
              return (
                <div key={index}>
                  <p>{stream.title}</p>
                  <p>{stream.viewer_count} spectateurs</p>
                  <p>{streamer}</p>
                </div>
              );
            })}

          {this.props.games.fetched &&
            this.props.games.games.map((game, index) => {
              return (
                <div key={index}>
                  {game.id === gameId && <p>{game.name}</p>}
                </div>
              );
            })}
        </div>

        {/* Chat */}
        <div className="chat">
          <iframe width={340} height={700} src={chatUrl} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    games: state.gamesReducer,
    streams: state.streamsReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGames: () => {
      dispatch(fetchGames());
    },
    fetchStreams: url => {
      dispatch(fetchStreams(url));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveStream);
