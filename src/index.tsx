import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

type SquareProps = {
    value: string;
    onClick: () => void
}

function SquareFunction(props: SquareProps) {
    console.log(`Square Render`);
    return (
        <button
            className="square"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

const Square = React.createFactory(SquareFunction);

type BoardProps = {
    squares: string[],
    onClick: (index: number) => void
}

class BoardComponent extends React.Component<BoardProps> {

    constructor(props: BoardProps, private name: string){
        super(props);
        console.log(`Board`);
    }

    renderSquare(index: number) {
        return <Square
            value={this.props.squares[index]}
            onClick={() => this.props.onClick(index)}
        />;
    }

    render() {
        return (
        <div>
            <span>name: {this.name}</span>
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        </div>
        );
    }
}

function wrapComponent<P>(component: new (...args: any[]) => Component<P, any>){

    return class extends component{
        constructor(props: P){
            super(props, "nameFromSuper")
        }
    }
}

const Board = wrapComponent(BoardComponent);

type GameState = {
    history: string[][],
    xIsNext: boolean,
    stepNumber: number,
}

class Game extends React.Component<{}, GameState> {
    constructor(props: {}){
        super(props)

        this.state = {
            history: [Array(9).fill(null)],
            xIsNext: true,
            stepNumber: 0
        }
    }

    jumpTo(step: number){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    handleClick(index: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const squares = history[history.length - 1].slice();

        if(calculateWinner(squares) || squares[index]){
            return;
        }

        squares[index] = this.nextPlayer();
        this.setState({
            history: history.concat([squares]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });
    }

    nextPlayer() {
        return this.state.xIsNext ? 'X' : 'O';
    }

    render() {
        const history = this.state.history;
        const squares = history[this.state.stepNumber];
        const winner = calculateWinner(squares);

        let status;

        if(winner){
            status = `Winner: ${winner}`;
        } else {
            status = `Next player: ${this.nextPlayer()}`;
        }

        const moves = history.map((step, move) => {
            const desc = move === 0 ? 'Go to start' : `Go to Move #${move}`

            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        })

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={squares}
                        onClick={i => this.handleClick(i)}
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

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares: string[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
