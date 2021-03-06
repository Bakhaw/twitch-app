import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';

import { connect } from 'react-redux';
import { fetchGames } from '../../redux/actions/fetchGames';

class TopGames extends Component {
  componentDidMount() {
    this.props.fetchGames('https://api.twitch.tv/helix/games/top?first=100');
  }

  render() {
    const { topGames } = this.props;

    if (!topGames.fetched)
      return (
        <div className='rightContent'>
          <div className='loading'>
            <CircularProgress size={20} color='black' />
          </div>
        </div>
      );

    return (
      <div className='rightContent'>
        <div className='gamesContainer'>
          {topGames.games.map((game, index) => {
            return (
              <div key={index} className='gameCard'>
                <Link to={`/streams/${game.id}`} params={{ gameid: game.id }}>
                  <img
                    src={`${game.box_art_url.slice(0, -21)}-285x300.jpg`}
                    alt={`${game.name} cover`}
                  />
                  <p>{game.name}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    topGames: state.gamesReducer
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
)(TopGames);
