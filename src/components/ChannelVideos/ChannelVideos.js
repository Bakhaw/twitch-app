import React, { Component } from 'react';
import moment from 'moment';

import { connect } from "react-redux";
import { fetchUser } from "../../redux/actions/fetchUser";

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
          <iframe src="https://player.twitch.tv/?video=221742982" frameBorder="0" height={200} width={250} />
            {userVideos.userVideos.data.map((video, index) => {
              let date = video.created_at;
              let videoDate = moment(date).locale('fr').format('DD MMM YYYY');
              return (
                <div key={index} className="videoCard">
                  <p>view count: {video.view_count}</p>
                  <p>duration: {video.duration}</p>
                  <img src={`${video.thumbnail_url.slice(0, -22)}300x300.jpg`} alt={`${video.title} cover image`} />                  
                  {/* <p>video ID: {video.id}</p> */}
                  {/* <p>user ID: {video.user_id}</p> */}
                  <div className="videoInfos">
                    <p>{video.title}</p>
                    <p>{videoDate}</p>
                    <p>url: {video.url}</p>
                  </div>
                  {/* <p>published at: {video.published_at}</p> */}
                  {/* <p>language: {video.language}</p> */}
                  {/* <p>Type? {video.viewable}</p> */}
                </div>
              )
            })}
          </div>
        }
        <div className="chat">
          {/* <iframe src={chatUrl} /> */}
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
