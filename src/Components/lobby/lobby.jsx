// import React, { Component } from "react";

// import "./lobby.css";
// import GameRooms from "./gamerooms.jsx";

// class Lobby extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: this.props.username,
//             games: this.props.games,
//             players: this.props.players,
//             gameNameInput: '',
//             gamePlayersInput: '2'
//         };
//         this.createGame = this.createGame.bind(this);
//         this.logout = this.logout.bind(this);
//         this.getGameData = this.getGameData.bind(this);
//     }

//     handleNameChange(event) {
//         this.setState({ gameNameInput: event.target.value });
//     }

//     handlePlayersChange(event) {
//         this.setState({ gamePlayersInput: event.target.value });
//     }

//     getGameData(gamename) {
//         this.props.sendGameData(gamename);
//     }

//     logout() {
//         const data = new URLSearchParams();
//         data.append('username', this.state.username);
//         fetch('/logout', {
//             method: 'post',
//             body: data
//         }).then(res => {
//             if (res.status === 200) {
//                 window.location.reload();
//             } else {
//                 return res.json();
//             }
//         }).then(jsonData => {
//             if (jsonData) {
//                 alert(jsonData.error);
//             }
//         });
//     }

//     componentDidMount() {
//         setInterval(() => {
//             fetch('/issignedin?username=' + this.state.username, {
//                 method: 'get'
//             }).then(response => response.json())
//                 .then((data) => {
//                     if (data.answer === 'no') {
//                         window.location.reload();
//                     }
//                 });
//         }, 5000);
//     }

//     componentWillReceiveProps({ games, players }) {
//         this.setState({
//             games: games,
//             players: players
//         });
//     }

//     createGame() {
//         if (!this.state.gamePlayersInput) {
//             alert("Must provide number of players");
//             return;
//         }
//         const numberOfPlayers = parseInt(this.state.gamePlayersInput);
//         if (numberOfPlayers !== 2 && numberOfPlayers !== 3) {
//             alert('Number of players has to be either 2 or 3');
//             return;
//         }
//         if (this.state.gameNameInput in this.state.games) {
//             alert('Game name already taken');
//             return;
//         }
//         const data = new URLSearchParams();
//         data.append('username', this.state.username);
//         data.append('gamename', this.state.gameNameInput);
//         data.append('players', this.state.gamePlayersInput);
//         fetch('/creategame', {
//             method: 'post',
//             body: data
//         }).then(res => {
//             if (res.status === 200) {
//                 this.setState({ gameNameInput: '', gamePlayersInput: '2' });
//             } else {
//                 return res.json();
//             }
//         }).then(jsonData => {
//             if (jsonData) {
//                 alert(jsonData.error);
//             }
//         });
//     }

//     render() {
//         return (
//             <div className="lobby">
//                 <h1>Lobby</h1>
//                 <table width="60%">
//                     <tbody>
//                         <tr>
//                             <td valign="top">
//                                 <div className="players">
//                                     <h2>Players</h2>
//                                     <ul>
//                                         {this.state.players.map((player) => (
//                                             <li key={player} className={player === this.state.username ? 'me' : ''}>{player}</li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             </td>
//                             <td>
//                                 <div className="games">
//                                     <h2>Games</h2>
//                                     <h3>Create Game</h3>
//                                     <div className="creategame" align="center">
//                                         <label>Game Name: </label>
//                                         <input type="text" value={this.state.gameNameInput} onChange={evt => this.handleNameChange(evt)} />
//                                         &nbsp; &nbsp;
//                                         <label>Players:</label>
//                                         <select onChange={evt => this.handlePlayersChange(evt)} value={this.state.gamePlayersInput}>
//                                             <option value="2">2</option>
//                                             <option value="3">3</option>
//                                         </select>
//                                         <button onClick={this.createGame}>Create</button>
//                                     </div>
//                                     <h3>Game Rooms</h3>
//                                     <GameRooms sendGameData={this.getGameData} games={this.state.games} username={this.state.username} />
//                                 </div>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td colSpan="2">
//                                 <br/>
//                                 <button onClick={this.logout}>Logout</button>
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div >
//         );
//     }
// }

// export default Lobby;

import React, { useState, useEffect } from "react";
import "./lobby.css";
import GameRooms from "./gamerooms.jsx";

const Lobby = ({ username, games, players, sendGameData }) => {
  const [gameNameInput, setGameNameInput] = useState("");
  const [gamePlayersInput, setGamePlayersInput] = useState("2");
  const [currentGames, setCurrentGames] = useState(games);
  const [currentPlayers, setCurrentPlayers] = useState(players);

  const handleNameChange = (event) => {
    setGameNameInput(event.target.value);
  };

  const handlePlayersChange = (event) => {
    setGamePlayersInput(event.target.value);
  };

  const getGameData = (gamename) => {
    sendGameData(gamename);
  };

  const logout = () => {
    const data = new URLSearchParams();
    data.append("username", username);
    fetch("/logout", {
      method: "post",
      body: data,
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        } else {
          return res.json();
        }
      })
      .then((jsonData) => {
        if (jsonData) {
          alert(jsonData.error);
        }
      });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(`/issignedin?username=${username}`, { method: "get" })
        .then((response) => response.json())
        .then((data) => {
          if (data.answer === "no") {
            window.location.reload();
          }
        });
    }, 5000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [username]);

  useEffect(() => {
    setCurrentGames(games);
    setCurrentPlayers(players);
  }, [games, players]);

  const createGame = () => {
    if (!gamePlayersInput) {
      alert("Must provide number of players");
      return;
    }
    const numberOfPlayers = parseInt(gamePlayersInput);
    if (numberOfPlayers !== 2 && numberOfPlayers !== 3) {
      alert("Number of players has to be either 2 or 3");
      return;
    }
    if (gameNameInput in currentGames) {
      alert("Game name already taken");
      return;
    }
    const data = new URLSearchParams();
    data.append("username", username);
    data.append("gamename", gameNameInput);
    data.append("players", gamePlayersInput);
    fetch("/creategame", {
      method: "post",
      body: data,
    })
      .then((res) => {
        if (res.status === 200) {
          setGameNameInput("");
          setGamePlayersInput("2");
        } else {
          return res.json();
        }
      })
      .then((jsonData) => {
        if (jsonData) {
          alert(jsonData.error);
        }
      });
  };

  return (
    <div className="lobby">
      <h1>Lobby</h1>
      <table width="60%">
        <tbody>
          <tr>
            <td valign="top">
              <div className="players">
                <h2>Players</h2>
                <ul>
                  {currentPlayers.map((player) => (
                    <li
                      key={player}
                      className={player === username ? "me" : ""}
                    >
                      {player}
                    </li>
                  ))}
                </ul>
              </div>
            </td>
            <td>
              <div className="games">
                <h2>Games</h2>
                <h3>Create Game</h3>
                <div className="creategame" align="center">
                  <label>Game Name: </label>
                  <input
                    type="text"
                    value={gameNameInput}
                    onChange={handleNameChange}
                  />
                  &nbsp; &nbsp;
                  <label>Players:</label>
                  <select
                    onChange={handlePlayersChange}
                    value={gamePlayersInput}
                  >
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                  <button onClick={createGame}>Create</button>
                </div>
                <h3>Game Rooms</h3>
                <GameRooms
                  sendGameData={getGameData}
                  games={currentGames}
                  username={username}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <br />
              <button onClick={logout}>Logout</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Lobby;
