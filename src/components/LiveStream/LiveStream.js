import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { connect } from "react-redux";
import { fetchGames } from "../../redux/actions/fetchGames";
import { fetchStreams } from "../../redux/actions/fetchStreams";
import { fetchUser } from "../../redux/actions/fetchUser";
import { fetchUserFollows } from "../../redux/actions/fetchUserFollows";

import ChannelHeader from './ChannelHeader';
import StreamInfosBar from "./StreamInfosBar";

class LiveStream extends Component {

  state = {
    // store the game ID from react router params (/live/gameId) to make dynamic fetching with this ID    
    streamer: this.props.match.params.streamer,
    gameId: this.props.match.params.gameId,
  }

  componentWillMount() {
    this.props.fetchStreams(`https://api.twitch.tv/helix/streams?user_login=${this.state.streamer}`);
    this.props.fetchGames(`https://api.twitch.tv/helix/games?id=${this.state.gameId}`);
    this.props.fetchUser(`https://api.twitch.tv/helix/users?login=${this.state.streamer}`);
  }

  render() {

    let videoPlayerUrl = `https://twitch.tv/${this.state.streamer}/embed`;
    let chatUrl = `https://twitch.tv/${this.state.streamer}/chat`;

    const { streams, user, game, userFollows } = this.props;

    return (
      <div className="rightContent">
        <div className="liveStreamContainer">

          {/* Video Player */}
          <div className="videoContainer">

            {streams.fetched && user.fetched && game.fetched &&
              <div>

                <ChannelHeader userLogin={user.user.data[0].login}
                               userName={user.user.data[0].display_name}
                               userImage={user.user.data[0].profile_image_url}
                               followers={userFollows}/>
                
                <div className="videoPlayer">
                  <iframe
                    allowFullScreen
                    src={videoPlayerUrl}
                  />
                </div>

                <StreamInfosBar {...this.props}/>

              </div>
            }

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
    user: state.userReducer,
    userFollows: state.userFollowsReducer
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
