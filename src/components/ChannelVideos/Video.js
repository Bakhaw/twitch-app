import React, { Component } from "react";

import ChannelHeader from "../LiveStream/ChannelHeader";
import StreamInfosBar from "../LiveStream/StreamInfosBar";

import { connect } from "react-redux";
import { fetchUser } from "../../redux/actions/fetchUser";

class Video extends Component {
  state = {
    // store the game ID from react router params (/live/gameId) to make dynamic fetching with this ID
    streamer: this.props.match.params.streamer
  };

  componentWillMount() {
    this.props.fetchUser(
      `https://api.twitch.tv/helix/users?login=${this.state.streamer}`
    );
  }

  render() {
    const videoId = this.props.match.params.videoId;
    const videoUrl = `https://player.twitch.tv/?video=${videoId}`;

    const streamer = this.props.match.params.streamer;
    const chatUrl = `https://twitch.tv/${streamer}/chat`;

    const { user, userFollows, userVideos } = this.props;

    console.log(this.props)

    return (
      <div className="rightContent">
        <div className="liveStreamContainer">
          <div className="videoContainer">
            {user.fetched &&
              userVideos.fetched && (
                <div>
                  <ChannelHeader
                    userLogin={user.user.data[0].login}
                    userName={user.user.data[0].display_name}
                    userImage={user.user.data[0].profile_image_url}
                    followers={userFollows}
                  />
                  <div className="videoPlayer">
                    <iframe src={videoUrl} frameBorder="0" />
                  </div>

                  {/* <StreamInfosBar
                    {...this.props}
                    data={this.props.userVideos.userVideos.data}
                  /> */}
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
    user: state.userReducer,
    userFollows: state.userFollowsReducer,
    userVideos: state.userVideosReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: url => {
      dispatch(fetchUser(url));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Video);
