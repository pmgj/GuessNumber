import GuessNumber from "./GuessNumber.js";
import Winner from "./Winner.js";

class GUI {
    constructor() {
        this.game = null;
        this.form = document.forms[0];
    }
    registerEvents() {
        this.form.onsubmit = this.check.bind(this);
        this.form.n.focus();
        this.startGame();
    }
    startGame() {
        this.game = new GuessNumber();
        let chances = document.querySelector(".chances");
        chances.textContent = this.game.getTries();
        this.setMessage("&nbsp;");
        this.form.n.value = "";
    }
    setMessage(msg) {
        let message = document.querySelector(".guess");
        message.innerHTML = msg;
    }
    setTries() {
        let message = document.querySelector(".chances");
        message.textContent = this.game.getTries();
    }
    check(evt) {
        evt.preventDefault();
        let numero = this.form.n.valueAsNumber;
        let w = this.game.check(numero);
        this.setTries();
        if(w.winner === Winner.LOSE) {
            this.setMessage(`You lose! Correct number: ${this.game.getNumber()}`);
            setTimeout(this.startGame.bind(this), 4000);
        } else if (w.answer === Winner.SMALLER) {
            this.setMessage(`Your number is too small! [${w.min}, ${w.max}]`);
        } else if (w.answer === Winner.BIGGER) {
            this.setMessage(`Your number is too big! [${w.min}, ${w.max}]`);
        } else {
            this.setMessage(`Congratulations!`);
            setTimeout(this.startGame.bind(this), 4000);
        }
    }
}
let gui = new GUI();
gui.registerEvents();