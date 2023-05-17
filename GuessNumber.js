import Winner from "./Winner.js";

export default class GuessNumber {
    constructor(tries = 7) {
        this.number = this.getRandomIntInclusive(1, 100);
        this.tries = tries;
        this.min = 1;
        this.max = 100;
    }
    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    check(n) {
        let obj = {};
        if (--this.tries <= 0) {
            obj.winner = Winner.LOSE;
        }
        if (n < this.number) {
            obj.answer = Winner.SMALLER;
            this.min = n + 1;
            obj.min = n + 1;
            obj.max = this.max;
        } else if (n > this.number) {
            obj.answer = Winner.BIGGER;
            obj.min = this.min;
            obj.max = n - 1;
            this.max = n - 1;
        } else {
            obj.winner = Winner.WIN;
        }
        return obj;
    }
    getNumber() {
        return this.number;
    }
    getTries() {
        return this.tries;
    }
}