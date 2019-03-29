import React from 'react';
import { Link } from 'react-router-dom';

function ChannelHeader({ followers, gameId, userImage, userLogin, userName }) {
  return (
    <div className='channelHeader'>
      <div className='userInfos'>
        <img src={userImage} alt={`${userName} profile image`} />
        <h5>{userName}</h5>
      </div>
      <div>
        <Link to={`/${gameId}/${userLogin}/videos`} params={{ gameId }}>
          <h5>Vidéos</h5>
        </Link>
      </div>
      <div className='disabled'>
        <h6>Clips</h6>
      </div>
      <div className='disabled'>
        <h6>Collections</h6>
      </div>
      <div className='disabled'>
        <h6>Événements</h6>
      </div>
      <div className='followers'>
        <h5>Followers</h5>
        {followers.fetched && (
          <h5>{followers.userFollows.total.toLocaleString()}</h5>
        )}
      </div>
      <div className='disabled'>
        <h6>Suivis</h6>
      </div>
    </div>
  );
}

export default ChannelHeader;
