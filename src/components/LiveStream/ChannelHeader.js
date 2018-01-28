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
          <Link to={`/${this.props.gameId}/${this.props.userLogin}/videos`}
                params={{ gameId: this.props.gameId }}>
                <h5>Vidéos</h5>
          </Link>
        </div>
        <div>
          <h6>Clips</h6>
        </div>
        <div>
          <h6>Collections</h6>
        </div>
        <div>
          <h6>Événements</h6>
        </div>
        <div className="followers">
          <h5>Followers</h5>
          {this.props.followers.fetched &&
            <h5>{this.props.followers.userFollows.total.toLocaleString()}</h5>
          }
        </div>
        <div>
          <h6>Suivis</h6>
        </div>
      </div>
    )
  }
}

export default ChannelHeader;