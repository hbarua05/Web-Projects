import React, { Component } from "react";
import ReactDOM from "react-dom";
import Board from "./components/board";
import "./styles.css";

class Game extends Component {
    render() {
        return <Board />;
    }
}

ReactDOM.render(<Game />, document.getElementById("root"));
