import React from 'react';
import Sidebar from './Sidebar.jsx'

class App extends React.Component {
  render() {
    return (
      <div>
        <Sidebar history={this.props.history} />
        { this.props.children }
      </div>
    );
  }
}

export default App;
