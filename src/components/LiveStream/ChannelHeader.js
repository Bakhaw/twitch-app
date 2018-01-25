import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ChannelHeader extends Component {
  render() {
    return (
      <div className="channelHeader">
        <div className="userInfos">
          <img src={this.props.userImage} alt={`${this.props.userName} profile image`} />
          <h5>{this.props.userName}</h5>
        </div>
        <div>
          <Link to={`/${this.props.userLogin}/videos`}><h5>Vidéos</h5></Link>
        </div>
        <div>
          <h5>Clips</h5>
        </div>
        <div>
          <h5>Collections</h5>
        </div>
        <div>
          <h5>Événements</h5>
        </div>
        <div className="followers">
          <h5>Followers</h5>
          {this.props.followers.fetched &&
            <h5>{this.props.followers.userFollows.total}</h5>
          }
        </div>
        <div>
          <h5>Suivis</h5>
        </div>
      </div>
    )
  }
}

export default ChannelHeader;