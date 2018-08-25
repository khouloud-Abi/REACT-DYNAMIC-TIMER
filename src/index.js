import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class Control extends React.Component {
  constructor(props) {
    super(props);
  }

  onClickHandler = () => {
    if (this.props.paused) {
      this.props.start();
    } else {
      this.props.stop();
    }
  };

  render() {
    return (
      <button
        className={this.props.paused ? "paused" : ""}
        onClick={this.onClickHandler}
      >
        {this.props.paused ? "PLAY" : "PAUSE"}
      </button>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 5552445,
      paused: true,
      Hour: 0,
      Minute: 0,
      Second: 0
    };
  }

  conversion() {
    let Hour = Math.floor((this.state.timer / 3600) % 24);
    let Minute = Math.floor((this.state.timer / 60) % 60);
    let Second = Math.floor(this.state.timer % 60);
    let result = new Array();
    result.push(Hour < 10 ? "0" + Hour + "  :" : Hour + "  :");
    result.push(Minute < 10 ? "0" + Minute + "  :" : Minute + "  :");
    result.push(Second < 10 ? "0" + Second : Second);
    return result;
  }

  startTimer = () => {
    this.interval = setInterval(() => {
      this.setState({
        timer: this.state.timer + 1
      });
    }, 1000);
    this.setState({ paused: false });
  };

  stopTimer = () => {
    clearInterval(this.interval);
    this.setState({ paused: true });
  };

  reset = () => {
    this.setState({ timer: 0, paused: true });
    clearInterval(this.interval);
  };

  render() {
    return (
      <div className="all">
        <h1>{this.conversion()}</h1>
        <div className="Timer-unity">
          <h5>Hour</h5>
          <h5>Minute</h5>
          <h5>Second</h5>
        </div>
        <div className="container">
          <Control
            paused={this.state.paused}
            start={this.startTimer}
            stop={this.stopTimer}
          />
          <button onClick={this.reset} className="reset">
            RESET
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
