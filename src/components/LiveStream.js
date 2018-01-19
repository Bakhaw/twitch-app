import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGames } from "../redux/actions/fetchGames";
import { fetchStreams } from "../redux/actions/fetchStreams";

class LiveStream extends Component {
  componentWillMount() {

    // store the game ID from react router params (/live/gameId) to make dynamic fetching with this ID
    let gameId = this.props.match.params.gameId;
    this.props.fetchStreams(
      `https://api.twitch.tv/helix/streams?game_id=${gameId}&first=100`
    );
    this.props.fetchGames();
  }

  render() {

    let streamer = this.props.match.params.streamer;
    let gameId = this.props.match.params.gameId;

    return (
      <div>

        <iframe
          style={{ width: "500px", height: "300px" }}
          src={`https://twitch.tv/${streamer}/embed`}
        />
        <iframe
          style={{ width: "300px", height: "500px" }}
          src={`https://twitch.tv/${streamer}/chat`}
        />

        {/* STREAM DATA (TITLE, VIEWERS) */}
        {this.props.streams.fetched &&
            this.props.streams.streams.data.map((stream, index) => {
              return (
                <div key={index}>
                  {stream.thumbnail_url.slice(52).slice(0, -21) === streamer &&
                    <div>
                      <p>{stream.title}</p>
                      <p>{stream.viewer_count} spectateurs</p>
                      <p>{streamer}</p>
                    </div>
                  }
                </div>
              )
            })
        }

        {this.props.games.fetched &&
            this.props.games.games.map((game, index) => {
              return (
                <div key={index}>
                  {game.id === gameId &&
                    <p>{game.name}</p>
                  }
                </div>
              )
            })
        }

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    games: state.gamesReducer,
    streams: state.streamsReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGames: () => {
      dispatch(fetchGames());
    },
    fetchStreams: url => {
      dispatch(fetchStreams(url));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveStream);
