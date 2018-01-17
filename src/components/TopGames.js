import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchGames } from '../redux/actions/fetchGames';

import './TopGames.scss';

class TopGames extends Component {

  async componentWillMount() {
    await this.props.fetchGames();
  }

  render() {

    const topGames = this.props.topGames;

    return (
      <div>
        <h3>Twitch App</h3>
        <h1>TOP GAMES</h1>
        {!topGames.fetched &&
          <p>Chargement ...</p>
        }
        {topGames.fetched &&
          <div className="games">
            {topGames.games.map((game, index) => {
              return (
                <div key={index} className="game">
                  <img src={`${game.box_art_url.slice(0, -21)}-300x300.jpg`} alt=""/>
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
