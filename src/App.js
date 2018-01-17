import React, { Component } from 'react';
import TopGames from './components/TopGames';
import Streams from './components/Streams';

class App extends Component {

  render() {
    return (
      <div>
        {/* <TopGames /> */}
        <Streams />
      </div>
    );
  }
}

export default App;
