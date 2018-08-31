import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      servers: []
    };
  }

  remove = () => {
    fetch("https://httpbin.org/post", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  };

  create = () => {
    fetch("https://httpbin.org/post", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  };

  componentDidMount() {
    Axios.get(
      "https://backcraft.azurewebsites.net/api/pods?code=CudLc3BieuYrZnomsQbAqSS2s2xor23Rwb5fSKmWgz2vgZyOZJZJ3A==",
      {
        crossDomain: true,
        headers: {
          Accept: "application/json"
        }
      }
    ).then(response => {
      console.log(response.data);
      this.setState({
        servers: response.data
      });
    });
  }

  render() {
    const { servers } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <button onClick={this.create}>Create server</button>
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>minecraft</th>
              <th>rcon</th>
            </tr>
          </thead>
          <tbody>
            {servers.map(server => (
              <tr key={server.name}>
                <td>{server.name}</td>
                <td>{server.endpoints.minecraft}</td>
                <td>{server.endpoints.rcon}</td>
                <td>
                  <button onClick={this.remove}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
