import { injectable } from "inversify";
import { Component } from "react";
import React from "react";
import { HighScoresService } from "../services/highScoresService";
import { createDIComponent } from "../util/di";
import { Square } from "./square";

export interface IBoardProps {
    squares: string[];
    onClick: (index: number) => void;
}

export interface IBoardState {
    highScore: number | undefined;
}

@injectable()
class BoardComponent extends Component<IBoardProps, IBoardState> {

    constructor(props: IBoardProps, highScoreService: HighScoresService) {
        super(props);

        this.state = {
            highScore: undefined,
        };

        highScoreService.getHighScoresAsync().subscribe((score) => {
            this.setState({highScore: score});
        });
    }

    public renderSquare(index: number) {
        return <Square
            value={this.props.squares[index]}
            onClick={() => this.props.onClick(index)}
        />;
    }

    public render() {
        return (
        <div>
            <div>High Score:</div>
            <div>{this.state.highScore ? this.state.highScore : "Loading..."}</div>
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

export const Board = createDIComponent(BoardComponent);
