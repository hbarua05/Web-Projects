import React, { Component } from "react";
import Square from "./squares.js";
import ResetButton from "./reset.js";

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            colors: Array(9).fill(""),
            xIsNext: true,
            winnerFound: false,
        };
    }

    calculateWinner(arr) {
        let list = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let check of list) {
            if (
                arr[check[0]] &&
                arr[check[0]] === arr[check[1]] &&
                arr[check[0]] === arr[check[2]]
            ) {
                let colors = this.state.colors.slice();
                colors[check[0]] = colors[check[1]] = colors[check[2]] =
                    "green";
                this.setState({
                    colors: colors,
                });
                return true;
            }
        }
        return false;
    }
    getStatusButton = () => {
        let statusButton;
        if (this.state.winnerFound) {
            statusButton = (
                <div className="status">
                    Winner: Player {this.state.xIsNext ? "O" : "X"}
                </div>
            );
        } else if (
            this.state.squares.filter((item) => item == null).length === 0 &&
            !this.state.winnerFound
        ) {
            statusButton = <div className="status">It's a Tie</div>;
        } else {
            statusButton = (
                <div className="status">
                    Next Player: {this.state.xIsNext ? "X" : "O"}
                </div>
            );
        }
        return statusButton;
    };

    reset = () => {
        this.setState({
            squares: Array(9).fill(null),
            colors: Array(9).fill(""),
            xIsNext: true,
            winnerFound: false,
        });
    };

    handleClick = (i) => {
        if (
            !this.state.squares[i] &&
            !this.calculateWinner(this.state.squares)
        ) {
            let newSquares = this.state.squares.slice();
            newSquares[i] = this.state.xIsNext ? "X" : " O";
            this.setState(
                (state) => {
                    return {
                        squares: newSquares,
                        xIsNext: !state.xIsNext,
                    };
                },
                () => {
                    if (this.calculateWinner(this.state.squares)) {
                        this.setState({
                            winnerFound: true,
                        });
                    }
                }
            );
        }
    };
    renderSquare(i) {
        return (
            <Square
                onClick={() => this.handleClick(i)}
                key={i}
                value={this.state.squares[i]}
                color={this.state.colors[i]}
            />
        );
    }

    render() {
        return (
            <div className="container">
                {this.getStatusButton()}
                <div className="board">
                    <div className="row">
                        {this.renderSquare(0)}
                        {this.renderSquare(1)}
                        {this.renderSquare(2)}
                    </div>
                    <div className="row">
                        {this.renderSquare(3)}
                        {this.renderSquare(4)}
                        {this.renderSquare(5)}
                    </div>
                    <div className="row">
                        {this.renderSquare(6)}
                        {this.renderSquare(7)}
                        {this.renderSquare(8)}
                    </div>
                </div>
                {this.state.squares.some((item) => item != null) ? (
                    <ResetButton onClick={() => this.reset} />
                ) : (
                    ""
                )}
            </div>
        );
    }
}
