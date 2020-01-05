
import { Container } from "inversify";
import { Component } from "react";
import { HighScoresService } from "../services/highScoresService";
import { ScoreGenerator } from "./scoreGenerator";

export interface IGameContext {
    diContainer: Container;
}

const diContainer = new Container();

export function setupDi() {
    diContainer.bind(HighScoresService).to(HighScoresService);
    diContainer.bind(ScoreGenerator).to(ScoreGenerator);
}

export function createDIComponent<P>(component: new (...args: any[]) => Component<P, any>) {

    return class extends component {
        constructor(props: P) {
            const params: any[] = Reflect.getMetadata("design:paramtypes", component);

            const constructorParams = [props, ...params.slice(1).map((type) => diContainer.get(type))];

            super(...constructorParams);
        }
    };
}
