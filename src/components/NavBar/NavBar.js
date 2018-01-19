import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';

import TopGames from '../TopGames/TopGames';
import Streams from '../Streams/Streams';
import LiveStream from '../LiveStream/LiveStream';

import './NavBar.scss';

class NavBar extends Component {
  render() {
    return (
      <Router>
        <div>

          <nav className="navbar navbar-expand-lg">
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
            <Route path="/streams/:gameId" component={Streams} />
            <Route path="/live/:gameId/:streamer/:userId" component={LiveStream} />
          </Switch>
        </div>

      </Router>
    )
  }
}

export default NavBar;