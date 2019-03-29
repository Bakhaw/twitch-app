import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGames } from '../../redux/actions/fetchGames';
import { fetchStreams } from '../../redux/actions/fetchStreams';
import { fetchUser } from '../../redux/actions/fetchUser';

import ChannelHeader from './ChannelHeader';
import StreamInfosBar from './StreamInfosBar';

class LiveStream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // store the game ID from react router params (/live/gameId) to make dynamic fetching with this ID
      streamer: props.match.params.streamer,
      gameId: props.match.params.gameId
    };
  }

  componentDidMount() {
    const { fetchGames, fetchStreams, fetchUser } = this.props;
    const { gameId, streamer } = this.state;
    fetchStreams(`https://api.twitch.tv/helix/streams?user_login=${streamer}`);
    fetchGames(`https://api.twitch.tv/helix/games?id=${gameId}`);
    fetchUser(`https://api.twitch.tv/helix/users?login=${streamer}`);
  }

  render() {
    const { streams, user, game, userFollows } = this.props;
    const { gameId, streamer } = this.state;

    let videoPlayerUrl = `https://player.twitch.tv/?channel=${streamer}`;
    let chatUrl = `https://twitch.tv/embed/${streamer}/chat`;

    return (
      <div className='rightContent'>
        <div className='liveStreamContainer'>
          {/* Video Player */}
          <div className='videoContainer'>
            {streams.fetched && user.fetched && game.fetched && (
              <div>
                <ChannelHeader
                  gameId={gameId}
                  userLogin={user.user.data[0].login}
                  userName={user.user.data[0].display_name}
                  userImage={user.user.data[0].profile_image_url}
                  followers={userFollows}
                />

                <div className='videoPlayer'>
                  <iframe allowFullScreen src={videoPlayerUrl} />
                </div>
                <StreamInfosBar {...this.props} data={streams.streams.data} />
              </div>
            )}
          </div>

          {/* Chat */}
          <div className='chat'>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LiveStream);
