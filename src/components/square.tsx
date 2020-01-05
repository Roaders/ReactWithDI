import React from "react";

export interface ISquareProps {
    value: string;
    onClick: () => void;
}

export function Square(props: ISquareProps) {
    return (
        <button
            className="square"
            onClick={props.onClick}>
            {props.value}
        </button>
    );
}
