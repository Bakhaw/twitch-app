import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FrenchStreams extends Component {

  render() {

    let gameId = this.props.gameId;

    return (

      <div>
          <p>Chaînes en Français</p>        
        <div className="streamsSecondContainer">
          {this.props.streams.map((stream, index) => {

            let streamer = stream.thumbnail_url.slice(52).slice(0, -21);
            let streamImage = stream.thumbnail_url.slice(0, -20) + "320x180.jpg";
            let streamUrl = `/live/${gameId}/${streamer}`;

            return (
              <div key={index} className="streamsThirdContainer">

                {stream.language === "fr" &&
                  <div className="streamCard">
                    <div>
                      <Link to={streamUrl}
                        params={{ gameId, streamer }}>
                        <img src={streamImage} alt={`${streamer} cover image`} />
                      </Link>
                      <Link to={streamUrl}
                        params={{ gameId, streamer }}>
                        <h3>{stream.title}</h3>
                      </Link>
                      <p>{stream.viewer_count.toLocaleString()} spectateurs sur
                          <Link to={`/${gameId}/${streamer}/videos`}
                          params={{ gameId, streamer }}>
                          &nbsp;{streamer}
                        </Link>
                      </p>
                    </div>
                  </div>
                }
              </div>
            )
          })}
        </div>
      </div>

    )
  }
}

export default FrenchStreams;