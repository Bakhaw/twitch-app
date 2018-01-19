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

        {this.props.streams.fetched &&
          <div>
            {/* {this.props.streams.streams.data.map((stream, index) => {
              this.props.games.games.map((game, index) => {
                if (game.id === stream.game_id) {
                  console.log('matches!', game.id, stream.game_id)
                }
              })
            })} */}
          </div>
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
