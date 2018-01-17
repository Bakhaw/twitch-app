import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import TopGames from './TopGames';
import Streams from './Streams';

class NavBar extends Component {
  render () {
    return (
        <div>
            <Router>
                
                <div>
                    <ul>
                        <li><Link to="/top-games">Top Games</Link></li>
                        <li><Link to ="/streams">Streams</Link></li>
                    </ul>

                    <Switch>
                        <Route path="/top-games" component={TopGames}/>
                        <Route path="/streams" component={Streams}/>
                    </Switch>
                </div>

            </Router>
        </div>
    )
  }
}

export default NavBar;