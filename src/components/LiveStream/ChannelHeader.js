import React, { Component } from 'react';
import './ChannelHeader.scss';

class ChannelHeader extends Component {
  render() {
    return (
      <div className="channelHeader">
        <div className="userInfos">
          <img src={this.props.userImage} alt={`${this.props.userName} profile image`} />
          <h5>{this.props.userName}</h5>
        </div>
        <div>
          <h5>Vidéos</h5>
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
        <div>
          <h5>Followers</h5>
        </div>
        <div>
          <h5>Suivis</h5>
        </div>
      </div>
    )
  }
}

export default ChannelHeader;