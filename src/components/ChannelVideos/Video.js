import React, { Component } from "react";
import CircularProgress from 'material-ui/CircularProgress';

import ChannelHeader from "../LiveStream/ChannelHeader";
import StreamInfosBar from "../LiveStream/StreamInfosBar";

import { connect } from "react-redux";
import { fetchGames } from "../../redux/actions/fetchGames";
import { fetchUser } from "../../redux/actions/fetchUser";
import { fetchVideo } from "../../redux/actions/fetchVideo";

class Video extends Component {
  state = {
    // store the game ID from react router params (/live/gameId) to make dynamic fetching with this ID
    streamer: this.props.match.params.streamer,
    gameId: this.props.match.params.gameId,
    videoId: this.props.match.params.videoId
  };

  componentWillMount() {
    this.props.fetchGames(`https://api.twitch.tv/helix/games?id=${this.state.gameId}`);
    this.props.fetchUser(`https://api.twitch.tv/helix/users?login=${this.state.streamer}`);
    this.props.fetchVideo(`https://api.twitch.tv/helix/videos?id=${this.state.videoId}`);
  }

  render() {

    const gameId = this.props.match.params.gameId;
    const videoId = this.props.match.params.videoId;
    const videoUrl = `https://player.twitch.tv/?video=${videoId}`;

    const streamer = this.props.match.params.streamer;
    const chatUrl = `https://twitch.tv/${streamer}/chat`;

    const { game, user, userFollows, video } = this.props;

    return (
      <div className="rightContent">

      {/* before user is fetched */}
        {!user.fetched &&
          <div className="loading">
            <CircularProgress size={20} color="black" />
          </div>
        }
        <div className="liveStreamContainer">
          <div className="videoContainer">
            {user.fetched && video.fetched && (
              <div>
                <ChannelHeader
                  gameId={this.state.gameId}
                  userLogin={user.user.data[0].login}
                  userName={user.user.data[0].display_name}
                  userImage={user.user.data[0].profile_image_url}
                  followers={userFollows}
                />
                <div className="videoPlayer">
                  <iframe src={videoUrl} frameBorder="0" />
                </div>

                <StreamInfosBar
                  {...this.props}
                  data={this.props.video.video.data}
                />
              </div>
            )}
          </div>

          <div className="chat">
            <iframe src={chatUrl} frameBorder="0" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    game: state.gamesReducer,
    user: state.userReducer,
    userFollows: state.userFollowsReducer,
    video: state.videoReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGames: url => {
      dispatch(fetchGames(url));
    },
    fetchUser: url => {
      dispatch(fetchUser(url));
    },
    fetchVideo: url => {
      dispatch(fetchVideo(url));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Video);
