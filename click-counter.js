class ClickCounterGame extends HTMLElement {
     static get observedAttributes() {
        return ['prop']; // Add the prop attribute to the list of observed attributes
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._props = this.getAttribute('props') // Initialize the property from the attribute
        this.shadowRoot.innerHTML = `
            <style>
                .game-container {
                    text-align: center;
                    margin-top: 50px;
                }
                .score {
                    font-size: 2em;
                    margin: 20px 0;
                }
                .start-btn, .click-btn {
                    font-size: 1.5em;
                    padding: 10px 20px;
                    margin: 10px;
                    cursor: pointer;
                }
                .click-btn {
                    display: none;
                }
                .timer {
                    font-size: 1.5em;
                    margin: 20px 0;
                }
            </style>
            <div class="game-container">
                <div class="score">Score: 0</div>
                <div class="timer">Time left: 10</div>
                <button class="start-btn">Start Game</button>
                <button class="click-btn">Click Me!</button>
            </div>
        `;

        this.score = 0;
        this.timeLeft = 10;
        this.timerInterval = null;
        this.scoreElement = this.shadowRoot.querySelector('.score');
        this.timerElement = this.shadowRoot.querySelector('.timer');
        this.startButton = this.shadowRoot.querySelector('.start-btn');
        this.clickButton = this.shadowRoot.querySelector('.click-btn');

        this.startButton.addEventListener('click', this.startGame.bind(this));
        this.clickButton.addEventListener('click', this.incrementScore.bind(this));
    }

    startGame() {
        this.score = 0;
        this.timeLeft = 10;
        this.updateScore();
        this.updateTimer();
        this.startButton.style.display = 'none';
        this.clickButton.style.display = 'inline-block';
        this.timerInterval = setInterval(this.countDown.bind(this), 1000);
    }

    incrementScore() {
        this.score++;
        this.updateScore();
    }

    countDown() {
        this.timeLeft--;
        this.updateTimer();

        if (this.timeLeft === 0) {
            clearInterval(this.timerInterval);
            this.endGame();
        }
    }

    updateScore() {
        this.scoreElement.textContent = `Score: ${this.score}`;
    }

    updateTimer() {
        this.timerElement.textContent = `Time left: ${this.timeLeft}`;
    }

    endGame() {
        this.startButton.style.display = 'inline-block';
        this.clickButton.style.display = 'none';
        alert(`Game over! Your score is ${this.score}.`);
    }
    set props(value) {
    // Define a setter for the property
      console.log(value)
    this._props = value
    this.renderElements()
  }

  get props() {
    // Define a getter for the property
    return this._props
  }
}

customElements.define('click-counter-game', ClickCounterGame);
