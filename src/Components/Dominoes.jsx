// import React, { Component } from "react";
// import SignUp from "./signup/signup.jsx";
// import Lobby from "./lobby/lobby.jsx";
// import Game from "./game/game.jsx";

// class Dominoes extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isSignedUp: false,
//             games: {},
//             players: [],
//             activeGame: '',
//             username: '',
//         };
//         this.getData = this.getData.bind(this);
//         this.getGameData = this.getGameData.bind(this);
//     }

//     getCookie(cname) {
//         let name = cname + "=";
//         let decodedCookie = decodeURIComponent(document.cookie);
//         let ca = decodedCookie.split(';');
//         for (let i = 0; i < ca.length; i++) {
//             let c = ca[i];
//             while (c.charAt(0) === ' ') {
//                 c = c.substring(1);
//             }
//             if (c.indexOf(name) === 0) {
//                 return c.substring(name.length, c.length);
//             }
//         }
//         return "";
//     }

//     componentDidMount() {
//         const username = this.getCookie('username');
//         if (username) {
//             this.setState({ isSignedUp: true, username: username });
//         }
//         setInterval(() => {
//             fetch('/users', {
//                 method: 'get'
//             }).then(response => response.json())
//                 .then(data => {
//                     this.setState({ players: data });
//                 });
//             fetch('/games', {
//                 method: 'get'
//             }).then(response => response.json())
//                 .then(data => {
//                     this.setState({ games: data });
//                 });
//         }, 2000);
//     }

//     getData(username) {
//         this.setState({ isSignedUp: true, username: username });
//     }

//     getGameData(gamename) {
//         this.setState({ activeGame: gamename });
//     }

//     render() {
//         return (
//             <div>
//                 {!this.state.isSignedUp && <SignUp sendData={this.getData} />}
//                 {this.state.isSignedUp && !this.state.activeGame && <Lobby sendGameData={this.getGameData}
//                     games={this.state.games}
//                     players={this.state.players}
//                     username={this.state.username} />}
//                 {this.state.activeGame && <Game sendGameData={this.getGameData}
//                     username={this.state.username}
//                     game={this.state.games[this.state.activeGame]} />}
//             </div>
//         );
//     }
// }

// export default Dominoes;

import React, { useState, useEffect } from "react";
import SignUp from "./signup/signup.jsx";
import Lobby from "./lobby/lobby.jsx";
import Game from "./game/game.jsx";

const Dominoes = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [games, setGames] = useState({});
  const [players, setPlayers] = useState([]);
  const [activeGame, setActiveGame] = useState("");
  const [username, setUsername] = useState("");

  const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  useEffect(() => {
    const usernameFromCookie = getCookie("username");
    if (usernameFromCookie) {
      setIsSignedUp(true);
      setUsername(usernameFromCookie);
    }

    const intervalId = setInterval(() => {
      fetch("/users", {
        method: "get",
      })
        .then((response) => response.json())
        .then((data) => {
          setPlayers(data);
        });

      fetch("/games", {
        method: "get",
      })
        .then((response) => response.json())
        .then((data) => {
          setGames(data);
        });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const getData = (username) => {
    setIsSignedUp(true);
    setUsername(username);
  };

  const getGameData = (gamename) => {
    setActiveGame(gamename);
  };

  return (
    <div>
      {!isSignedUp && (
        <div className="mt-5">
          <SignUp sendData={getData} />
        </div>
      )}
      {isSignedUp && !activeGame && (
        <Lobby
          sendGameData={getGameData}
          games={games}
          players={players}
          username={username}
        />
      )}
      {activeGame && (
        <Game
          sendGameData={getGameData}
          username={username}
          game={games[activeGame]}
        />
      )}
    </div>
  );
};

export default Dominoes;
