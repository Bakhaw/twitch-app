import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Home from '../Home/Home';
import LeftMenu from '../LeftMenu/LeftMenu';
import TopGames from '../TopGames/TopGames';
import Streams from '../Streams/Streams';
import LiveStream from '../LiveStream/LiveStream';
import Video from '../ChannelVideos/Video';
import ChannelVideos from '../ChannelVideos/ChannelVideos';

class NavBar extends Component {
  render() {
    return (
      <Router>
        <div className="content">

          <nav className="navbar navbar-expand-lg fixed-top">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    <svg height="32px" version="1.1" viewBox="0 0 94 32" width="94px" x="0px" y="0px">
                      <path clipRule="evenodd" d="M88,5h-6V0h-9l-6,5h-5.5L59,7.5V5h-5V0H36v5H16l-5-5H0v22l5,5.25L14,32h6v-1.5l3,1.5h12l2-3l1,3h7v-3l3,3h8l0.5-3l2.5,3h10l3-3v3h4l3-3v3h7l7-6V10L88,5z M13,13H8v6h5v6H6l-4-4V2h6v5h5V13z M36,21.5L32.5,25H15V7h6v12h2V7h6v12h2V7h5V21.5z M44,25h-6V7h6V25z M44,5h-6V2h6V5z M57,13h-5v6h5v6h-7l-4-4V2h6v5h5V13z M72,13h-7v6h7v6h-9l-4-4V11l4-4h9V13z M91,25h-6V13h-5v12h-6V2h6v5h7l4,4V25z" fillRule="evenodd"></path>
                    </svg>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/directory" className="nav-link">Parcourir</Link>
                </li>
              </ul>
            </div>
          </nav>

          <LeftMenu />

          <Switch>
            <Route path="/directory" component={TopGames} />
            <Route path="/streams/:gameId" component={Streams} />
            <Route path="/:gameId/:streamer/videos/:videoId" component={Video} />
            <Route path="/:gameId/:streamer/videos" component={ChannelVideos} />
            <Route path="/live/:gameId/:streamer" component={LiveStream} />
            <Route path="/" component={Home} />         
          </Switch>
        </div>

      </Router>
    )
  }
}

export default NavBar;