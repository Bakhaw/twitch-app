import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import ChannelHeader from '../LiveStream/ChannelHeader';
import StreamInfosBar from '../LiveStream/StreamInfosBar';

import { connect } from 'react-redux';
import { fetchGames } from '../../redux/actions/fetchGames';
import { fetchUser } from '../../redux/actions/fetchUser';
import { fetchVideo } from '../../redux/actions/fetchVideo';

class Video extends Component {
  state = {
    // store the game ID from react router params (/live/gameId) to make dynamic fetching with this ID
    streamer: this.props.match.params.streamer,
    gameId: this.props.match.params.gameId,
    videoId: this.props.match.params.videoId
  };

  componentDidMount() {
    const { fetchGames, fetchUser, fetchVideo } = this.props;
    const { gameId, streamer, videoId } = this.state;
    fetchGames(`https://api.twitch.tv/helix/games?id=${gameId}`);
    fetchUser(`https://api.twitch.tv/helix/users?login=${streamer}`);
    fetchVideo(`https://api.twitch.tv/helix/videos?id=${videoId}`);
  }

  render() {
    const { match, user, userFollows, video } = this.props;
    const { streamer, videoId } = match.params;

    const videoUrl = `https://player.twitch.tv/?video=${videoId}`;
    const chatUrl = `https://twitch.tv/embed/${streamer}/chat`;

    /* before user is fetched */
    if (!user.fetched)
      return (
        <div className='rightContent'>
          <div className='loading'>
            <CircularProgress size={20} color='black' />
          </div>
        </div>
      );

    return (
      <div className='rightContent'>
        <div className='liveStreamContainer'>
          <div className='videoContainer'>
            {user.fetched && video.fetched && (
              <div>
                <ChannelHeader
                  gameId={this.state.gameId}
                  userLogin={user.user.data[0].login}
                  userName={user.user.data[0].display_name}
                  userImage={user.user.data[0].profile_image_url}
                  followers={userFollows}
                />
                <div className='videoPlayer'>
                  <iframe src={videoUrl} frameBorder='0' />
                </div>

                <StreamInfosBar {...this.props} data={video.video.data} />
              </div>
            )}
          </div>

          <div className='chat'>
            <iframe src={chatUrl} frameBorder='0' />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Video);
