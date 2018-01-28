import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class StreamInfosBar extends Component {
  render() {

    const user = this.props.user.user
    const videoId = this.props.match.params.videoId

    return (
      <div className="streamInfosContainer">
        {this.props.data.map((stream, index) => {

          return (
            <div key={index} className="streamInfos">
              <div className="gameInfos">
                <img src={`${this.props.game.games[0].box_art_url.slice(0, -21)}.jpg`} alt={`${this.props.game.games[0].name} cover image`} />
                <div className="textInfos">
                  <h4 data-text={stream.title}>{stream.title}</h4>
                  <div className="gameTitle">
                    <svg width="18px" height="18px" version="1.1" viewBox="0 0 18 18" x="0px" y="0px">
                      <path clipRule="evenodd" d="M9,8.293l-3-3V1h6v4.293L9,8.293z M5.293,12H1V6h4.293l3,3L5.293,12z M9,9.707l3,3V17H6v-4.293L9,9.707z M12.707,6H17v6h-4.293l-3-3L12.707,6z" fillRule="evenodd"></path>
                    </svg>
                    <Link to={`/streams/${this.props.match.params.gameId}`}><p>{this.props.game.games[0].name}</p></Link>
                  </div>
                </div>
              </div>

              <div className="streamerInfos">
                {stream.viewer_count &&
                  <div className="viewerCount">
                    <svg width="16px" height="16px" version="1.1" viewBox="0 0 16 16" x="0px" y="0px">
                      <path clipRule="evenodd" d="M11,14H5H2v-1l3-3h2L5,8V2h6v6l-2,2h2l3,3v1H11z" fillRule="evenodd"></path>
                    </svg>
                    <p>{stream.viewer_count.toLocaleString()}</p>
                  </div>
                }
                <div className="userViewCount">
                  <svg width="16px" height="16px" version="1.1" viewBox="0 0 16 16" x="0px" y="0px">
                    <path clipRule="evenodd" d="M11,13H5L1,9V8V7l4-4h6l4,4v1v1L11,13z M8,5C6.344,5,5,6.343,5,8c0,1.656,1.344,3,3,3c1.657,0,3-1.344,3-3C11,6.343,9.657,5,8,5z M8,9C7.447,9,7,8.552,7,8s0.447-1,1-1s1,0.448,1,1S8.553,9,8,9z" fillRule="evenodd"></path>
                  </svg>
                  <p>{user.data[0].view_count.toLocaleString()}</p>
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
    )
  }
}

export default StreamInfosBar;