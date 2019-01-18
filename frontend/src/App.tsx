import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SocketManager from './SocketManager.js';

const happy = "\uD83D\uDE00";
const sad = "\uD83D\uDE14";
const neutral = "\uD83D\uDE11";

type AppProps = {}
type AppState = {
  classification: [number, number];
}

class App extends Component<AppProps, AppState> {
  sm: SocketManager;

  constructor(props: AppProps) {
    super(props);

    this.onTextBoxChange = this.onTextBoxChange.bind(this);
    this.onRecieveClassification = this.onRecieveClassification.bind(this);
    this.sm = new SocketManager();

    this.state = {
      classification: [0, 0]
    };

    this.sm.registerListener('classifiedText', this.onRecieveClassification);
  }

  onTextBoxChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const value: String = event.currentTarget.value;
    this.sm.sendMessage('classifyText', value);
  }

  onRecieveClassification(data: [number, number]) {
    this.setState({ classification: [data[0], data[1]]})
  }

  chooseFace() {
    switch(true) {
      case (this.state.classification[0] / this.state.classification[1]) > 1.5:
        return happy
      case (this.state.classification[1] / this.state.classification[0]) > 1.5:
        return sad;
      default:
        return neutral;
    }
  }

  render() {

    const face = this.chooseFace();

    // I'd normally use the classNames package for this, but it doesn't currently have Typescript defintions
    // and is only used in this one place
    const logoClassNames = [
      'App-logo',
      face === happy ? 'App-logo-happy' : null
    ].join(' ');

    return (
      <div className="App">
        <header className="App-header">
          <p className={logoClassNames}>
            { this.chooseFace() }
          </p>
          <p>
            <textarea
              className="Input-area"
              onChange={this.onTextBoxChange}
              placeholder="Let's see how you're feeling!"
            />
          </p>
        </header>
      </div>
    );
  }
}

export default App;
