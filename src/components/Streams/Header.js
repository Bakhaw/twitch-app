import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchGames } from "../../redux/actions/fetchGames";

class Header extends Component {
  componentWillMount() {
    // store the game ID from the url (/streams/gameID) to make dynamic fetching with this ID
    const gameId = this.props.gameId;
    this.props.fetchGames(`https://api.twitch.tv/helix/games?id=${gameId}`);
  }

  render() {
    return (
      <div className="headerContainer">
        {/* Game Title */}
        {this.props.games.games.map((game, index) => {
          return (
            <div
              key={index}
              className="headerContent"
              style={{
                backgroundImage: `url(${game.box_art_url.slice(0, -21)}.jpg)`,
              }}
            >
              <div>
                <img src={`${game.box_art_url.slice(0, -21)}.jpg)`} alt={`${game.name} cover image`}/>
                <h2>{game.name}</h2>
              </div>                           
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    games: state.gamesReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGames: url => {
      dispatch(fetchGames(url));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);