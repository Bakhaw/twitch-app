import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from './components/NavBar';

class App extends Component {

  render() {
    return (
      <div>
      <MuiThemeProvider>
        <NavBar />
      </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
