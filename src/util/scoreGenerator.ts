import { injectable } from "inversify";

@injectable()
export class ScoreGenerator {
    public generate() {
        return Math.floor(Math.random() * 10000) + 1000;
    }
}
