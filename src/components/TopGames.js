import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchGames } from '../redux/actions/fetchGames';

import './TopGames.scss';

class TopGames extends Component {

  componentWillMount() {
    this.props.fetchGames();
  }

  render() {

    const topGames = this.props.topGames;

    return (
      <div>
        <h1>TOP GAMES</h1>
        {!topGames.fetched &&
          <p>Chargement ...</p>
        }
        {topGames.fetched &&
          <div className="gamesContainer">
            {topGames.games.map((game, index) => {
              return (
                <div key={index} className="gameCard">
                  <Link to={`/streams/${game.id}`}>
                    <img src={`${game.box_art_url.slice(0, -21)}-300x300.jpg`} alt={`${game.name} cover`}/>
                  </Link>
                  <p>{game.name}</p>
                  <p>Game ID #{game.id}</p>                  
                </div>
              )
            })}
          </div>      
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topGames: state.gamesReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGames: () => { dispatch(fetchGames()) }
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(TopGames);
