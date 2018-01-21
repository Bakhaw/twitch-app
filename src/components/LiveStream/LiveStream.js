import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGames } from "../../redux/actions/fetchGames";
import { fetchStreams } from "../../redux/actions/fetchStreams";
import { fetchUser } from "../../redux/actions/fetchUser";

import ChannelHeader from './ChannelHeader';

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
            {this.props.streams.fetched && this.props.user.fetched && this.props.game.fetched &&
              <div>

                <ChannelHeader userName={user.data[0].display_name} userImage={user.data[0].profile_image_url}/>
                <iframe
                  allowFullScreen
                  src={videoPlayerUrl}
                />

                {this.props.streams.streams.data.map((stream, index) => {

                  return (
                    <div key={index} className="streamInfos">

                      <div className="gameInfos">
                        <img src={`${this.props.game.games[0].box_art_url.slice(0, -21)}.jpg`} alt={`${this.props.game.games[0].name} cover image`}/>
                        <div>
                          <h4>{stream.title}</h4>
                          <div className="gameTitle">
                            <svg width="18px" height="18px" version="1.1" viewBox="0 0 18 18" x="0px" y="0px">
                              <path clip-rule="evenodd" d="M9,8.293l-3-3V1h6v4.293L9,8.293z M5.293,12H1V6h4.293l3,3L5.293,12z M9,9.707l3,3V17H6v-4.293L9,9.707z M12.707,6H17v6h-4.293l-3-3L12.707,6z" fill-rule="evenodd"></path>
                            </svg>
                            <p>{this.props.game.games[0].name}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="streamerInfos">
                        <div className="viewerCount">
                          <svg class="tw-svg__asset tw-svg__asset--glyphlive tw-svg__asset--inherit" width="16px" height="16px" version="1.1" viewBox="0 0 16 16" x="0px" y="0px">
                            <path clip-rule="evenodd" d="M11,14H5H2v-1l3-3h2L5,8V2h6v6l-2,2h2l3,3v1H11z" fill-rule="evenodd"></path>
                          </svg>
                          <p>{stream.viewer_count} spectateurs</p>
                        </div>
                        <div className="userViewCount">
                          <svg class="tw-svg__asset tw-svg__asset--glyphviews tw-svg__asset--inherit" width="16px" height="16px" version="1.1" viewBox="0 0 16 16" x="0px" y="0px">
                            <path clip-rule="evenodd" d="M11,13H5L1,9V8V7l4-4h6l4,4v1v1L11,13z M8,5C6.344,5,5,6.343,5,8c0,1.656,1.344,3,3,3c1.657,0,3-1.344,3-3C11,6.343,9.657,5,8,5z M8,9C7.447,9,7,8.552,7,8s0.447-1,1-1s1,0.448,1,1S8.553,9,8,9z" fill-rule="evenodd"></path>
                          </svg>
                          <p>{user.data[0].view_count}</p>
                        </div>

                        <div className="userButtons">
                          <button>Partager</button>
                          <button><i className="ion-android-more-vertical"></i></button>
                        </div>

                      </div>

                    </div>
                  )
                })}
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
