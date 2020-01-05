
import "reflect-metadata";

import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import { Game } from "./components/game";
import { setupDi } from "./util/di";

setupDi();

ReactDOM.render(
    <Game />,
    document.getElementById("root"),
);
