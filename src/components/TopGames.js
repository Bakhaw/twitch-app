import React, { Component } from 'react';
import axios from 'axios';
import config from '../key';
import './TopGames.scss';

class TopGames extends Component {

  constructor(props) {
    super(props);
    this.state = {
      games: [],
      fetched: false
    };
  }

  async componentWillMount() {

    const fetch = await axios.get('https://api.twitch.tv/helix/games/top', config)
    const games = await fetch.data.data
    this.setState({ games, fetched: true })
  }

  render() {

    
    return (
      <div>
        <h3>Twitch App</h3>
        <h1>TOP GAMES</h1>
        {!this.state.fetched &&
          <p>Chargement ...</p>
        }
        {this.state.fetched &&
          <div className="games">
            {this.state.games.map((game, index) => {
              return (
                <div key={index} className="game">
                  {console.log(game.box_art_url.slice(0, -21)+".jpg")}
                  {game.box_art_url === "https://static-cdn.jtvnw.net/ttv-boxart/Yakuza%20Kiwami%202-{width}x{height}.jpg"
                    ? <img src={game.box_art_url.slice(0, -25)} alt=""/>
                    : <img src={game.box_art_url.slice(0, -21)+".jpg"} alt=""/>
                  }
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

export default TopGames;
