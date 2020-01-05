
import { injectable } from "inversify";
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import { ScoreGenerator } from "../util/scoreGenerator";

@injectable()
export class HighScoresService {

    constructor(private generator: ScoreGenerator) {}

    public getHighScoresAsync() {
        return of(this.generator.generate()).pipe(delay(500));
    }

}
