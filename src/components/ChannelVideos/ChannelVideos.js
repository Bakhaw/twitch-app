import React, { Component } from 'react';
import moment from 'moment';

import { Link } from 'react-router-dom';

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
    const gameId = this.props.match.params.gameId;
    
    return (
      <div className="videosContainer">
        {userVideos.fetched &&
          <div className="videosContent">
            {userVideos.userVideos.data.map((video, index) => {

              let date = video.created_at;
              let videoDate = moment(date).locale('fr').format('DD MMM YYYY');
              let imageUrl = `${video.thumbnail_url.slice(0, -22)}320x180.jpg`;
              let videoId = video.id;
              let videoUrl = `/${gameId}/${streamer}/videos/${videoId}`

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
                      <svg>
                        <path clipRule="evenodd" d="M8,14c-3.313,0-6-2.687-6-6s2.687-6,6-6s6,2.687,6,6S11.313,14,8,14z M8,3C5.238,3,3,5.238,3,8s2.238,5,5,5s5-2.238,5-5S10.762,3,8,3z M9.646,10.354l-2-2L7.515,7.879l1-4l0.971,0.242L8.554,7.847l1.8,1.8L9.646,10.354z"></path>                        
                      </svg>
                      <p>{video.duration}</p>                      
                    </div>
                  </div>
                  <Link to={videoUrl}
                        params={{ gameId, videoId }}>
                    <img src={imageUrl} alt={`${video.title} cover image`} />                                          
                  </Link>
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
