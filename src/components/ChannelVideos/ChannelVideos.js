import React, { Component } from 'react';

import { connect } from "react-redux";
import { fetchUser } from "../../redux/actions/fetchUser";

import './ChannelVideos.scss';

class ChannelVideos extends Component {

  state = {
    streamer: this.props.match.params.streamer,
  }

  componentWillMount() {
    this.props.fetchUser(`https://api.twitch.tv/helix/users?login=${this.state.streamer}`);
  }

  render() {

    const { userVideos } = this.props;
    const streamer = this.props.match.params.streamer;
    const chatUrl = `https://twitch.tv/${streamer}/chat`;

    return (
      <div className="videosContainer">
        {userVideos.fetched &&
          <div className="videosContent">
            {userVideos.userVideos.data.map((video, index) => {
              return (
                <div key={index}>
                  {console.log(video)}
                  <p>video ID: {video.id}</p>
                  <p>user ID: {video.user_id}</p>
                  <p>title: {video.title}</p>
                  <p>created at: {video.created_at}</p>
                  <p>published at: {video.published_at}</p>
                  <p>duration: {video.duration}</p>
                  <p>language: {video.language}</p>
                  <p>view count: {video.view_count}</p>
                  <p>Type? {video.viewable}</p>
                  <p>url: {video.url}</p>
                  <img src={`${video.thumbnail_url.slice(0, -22)}300x300.jpg`} alt={`${video.title} cover image`} />
                </div>
              )
            })}
          </div>
        }
        <div className="chat">
          <iframe src={chatUrl} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(ChannelVideos);
