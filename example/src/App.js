import * as React from 'react';
import { hot } from 'react-hot-loader';
import Rechextor from '../../src';
import './index.css';

class App extends React.Component {
  state = { value: '' };

  handleChange = value => {
    this.setState({ value });
  };

  render() {
    return (
      <div className="container">
        <header>
          <h1>Rechextor</h1>
          <h3>A simple rich text editor component for React</h3>
        </header>
        <Rechextor
          tools={[
            'bold',
            'strong',
            'italic',
            'underline',
            'strikethrough',
            'tag',
            'blockquote',
            'line'
          ]}
          initialValue={this.state.value}
          placeholder="To be continued..."
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default hot(module)(App);
