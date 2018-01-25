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
            {userVideos.userVideos.data.map((video, index) => {

              let date = video.created_at;
              let videoDate = moment(date).locale('fr').format('DD MMM YYYY');
              let imageUrl = `${video.thumbnail_url.slice(0, -22)}320x180.jpg`;

              return (
                <div key={index} className="videoCard">
                  <div className="videoTopInfos">
                    <div data-text="vues" className="stats">
                      <svg>
                        <path clipRule="evenodd" d="M11,13H5L1,9V8V7l4-4h6l4,4v1v1L11,13z M8,5C6.344,5,5,6.343,5,8c0,1.656,1.344,3,3,3c1.657,0,3-1.344,3-3C11,6.343,9.657,5,8,5z M8,9C7.447,9,7,8.552,7,8s0.447-1,1-1s1,0.448,1,1S8.553,9,8,9z" fillRule="evenodd"></path>
                      </svg>
                      <p>{video.view_count}</p>
                    </div>
                    <div data-text="durée" className="stats">
                      <p>{video.duration}</p>                      
                    </div>
                  </div>
                  <img src={imageUrl} alt={`${video.title} cover image`} />                  
                  <div className="videoBottomInfos">
                    <p>{video.title}</p>
                    <p>{videoDate} . {streamer}</p>
                  </div>
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
