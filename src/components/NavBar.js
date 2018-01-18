import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import TopGames from './TopGames';
import Streams from './Streams';

class NavBar extends Component {
  render() {
    return (
      <Router>
        <div>

          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Twitch App</Link>
                </li>
                <li className="nav-item">
                  <Link to="/top-games" className="nav-link">Top Games</Link>
                </li>
              </ul>
            </div>
          </nav>

          <Switch>
            <Route path="/top-games" component={TopGames} />
            <Route path="/streams" component={Streams} />
          </Switch>
        </div>

      </Router>
    )
  }
}

export default NavBar;