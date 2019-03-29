import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <MuiThemeProvider>
      <NavBar />
    </MuiThemeProvider>
  );
}

export default App;
