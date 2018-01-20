import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGames } from "../../redux/actions/fetchGames";
import { fetchStreams } from "../../redux/actions/fetchStreams";
import { fetchUser } from "../../redux/actions/fetchUser";

import "./LiveStream.scss";

class LiveStream extends Component {
  componentWillMount() {
    // store the game ID from react router params (/live/gameId) to make dynamic fetching with this ID
    let streamer = this.props.match.params.streamer;
    let gameId = this.props.match.params.gameId;

    this.props.fetchStreams(`https://api.twitch.tv/helix/streams?user_login=${streamer}`);
    this.props.fetchGames(`https://api.twitch.tv/helix/games?id=${gameId}`);
    this.props.fetchUser(`https://api.twitch.tv/helix/users?login=${streamer}`)
  }

  render() {
    let streamer = this.props.match.params.streamer;
    let gameId = this.props.match.params.gameId;
    let user = this.props.user.user
    let videoPlayerUrl = `https://twitch.tv/${streamer}/embed`;
    let chatUrl = `https://twitch.tv/${streamer}/chat`;

    return (
      <div className="rightContent">
        <div className="liveStreamContainer">
          {/* Video Player */}
          <div className="videoPlayer">
            <iframe
              allowFullScreen
              src={videoPlayerUrl}
            />

            {/* STREAM DATA (TITLE, VIEWERS) */}
            {this.props.streams.fetched && this.props.user.fetched && this.props.game.fetched &&
              this.props.streams.streams.data.map((stream, index) => {
                return (
                  <div key={index}>
                    {console.log(stream)}
                    <p>{stream.title}</p>
                    <p>{stream.viewer_count} spectateurs</p>
                    <p>{user.data[0].view_count}</p>
                    {console.log(user.data[0])}
                    <p>{user.data[0].display_name}</p>
                    <img src={user.data[0].profile_image_url} alt={`${user.data[0].display_name} profile image`}/>
                    <p>{this.props.game.games[0].name}</p>
                  </div>
                );
              })}


          </div>

          {/* Chat */}
          <div className="chat">
            <iframe src={chatUrl} />
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    game: state.gamesReducer,
    streams: state.streamsReducer,
    user: state.userReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGames: url => {
      dispatch(fetchGames(url));
    },
    fetchStreams: url => {
      dispatch(fetchStreams(url));
    },
    fetchUser: url => {
      dispatch(fetchUser(url));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveStream);
