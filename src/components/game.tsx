import React, { Component } from "react";
import { Board } from "./board";

export interface IGameState {
    history: string[][];
    xIsNext: boolean;
    stepNumber: number;
}

export class Game extends Component<{}, IGameState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            history: [Array(9).fill(null)],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    public jumpTo(step: number) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    public handleClick(index: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const squares = history[history.length - 1].slice();

        if (calculateWinner(squares) || squares[index]) {
            return;
        }

        squares[index] = this.nextPlayer();
        this.setState({
            history: history.concat([squares]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    public nextPlayer() {
        return this.state.xIsNext ? "X" : "O";
    }

    public render() {
        const history = this.state.history;
        const squares = history[this.state.stepNumber];
        const winner = calculateWinner(squares);

        let status;

        if (winner) {
            status = `Winner: ${winner}`;
        } else {
            status = `Next player: ${this.nextPlayer()}`;
        }

        const moves = history.map((step, move) => {
            const desc = move === 0 ? "Go to start" : `Go to Move #${move}`;

            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={squares}
                        onClick={(i) => this.handleClick(i)}
                        />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}
