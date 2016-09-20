import React, { Component } from 'react';

import NavigationBar from './nav/NavigationBar.jsx';
import PlayArea from './play-area/PlayArea.jsx';

export default class App extends Component {

    
    
  render() {
    return (
        <div className="container">
          <NavigationBar/>
          <PlayArea/>
        </div>
    );
  }
}