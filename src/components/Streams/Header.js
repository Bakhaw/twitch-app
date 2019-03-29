import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchGames } from '../../redux/actions/fetchGames';

class Header extends Component {
  componentDidMount() {
    // store the game ID from the url (/streams/gameID) to make dynamic fetching with this ID
    const { gameId, fetchGames } = this.props;
    fetchGames(`https://api.twitch.tv/helix/games?id=${gameId}`);
  }

  render() {
    return (
      <div className='headerContainer'>
        {/* Game Title */}
        {this.props.games.games.map((game, index) => {
          const backgroundImage = `linear-gradient(rgb(0, 0, 0) 0, rgba(0, 0, 0, 0.6) 0), url(${game.box_art_url.slice(
            0,
            -21
          )}.jpg)`;

          return (
            <div
              key={index}
              className='headerContent'
              style={{ backgroundImage }}
            >
              <div>
                <img
                  src={`${game.box_art_url.slice(0, -21)}.jpg)`}
                  alt={`${game.name} cover image`}
                />
                <div>
                  <Link to='/directory'>
                    <h4>
                      <i className='ion-chevron-left' /> Parcourir
                    </h4>
                  </Link>
                  <h2>{game.name}</h2>
                </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
