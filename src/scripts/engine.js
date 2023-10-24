const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemmy: document.querySelector(".enemmy"),
        enemmy2: document.querySelector(".enemmy-two"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        modal: document.querySelector("#modal"),
        playAgain: document.querySelector("#game-over"),
        restartButton: document.querySelector(".restart"),
    },
    values: {
        timerId: null,        
        gameSpeed: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 30,
    },
    actions: {
        countDownTimerId: null,
    },
    difficulties : {
        easy: document.querySelector(".easy"),
        medium: document.querySelector(".medium"),
        hard: document.querySelector(".hard")
    },
}

state.difficulties.easy.addEventListener("click", () => {
    gameDifficulty("easy")
})
state.difficulties.medium.addEventListener("click", () => {
    gameDifficulty("medium")
})
state.difficulties.hard.addEventListener("click", () => {
    gameDifficulty("hard")
})

function gameDifficulty(difficulty) {
    if (difficulty === "hard") {
        state.values.gameSpeed = 300;
        startGame()
    } else if (difficulty === "medium") {
        state.values.gameSpeed = 600;
        startGame()
    } else {
        state.values.gameSpeed = 900;
        startGame()
    }
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime

    if (state.values.currentTime <= 0) {
        playSound("gameover")
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.values.timerId)
        gameOver()
    }
}

function playSound(soundName) {
    let audio = new Audio(`./src/audios/${soundName}.m4a`)
    audio.volume = 0.2
    audio.play()
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemmy")
    square.classList.remove("enemmy-two")
  })

  let randomNumber = Math.floor(Math.random() * 9)
  let randomSquare = state.view.squares[randomNumber]
  randomSquare.classList.add("enemmy")
  state.values.hitPosition = randomSquare.id
}

function startTimer() {
    state.actions.countDownTimerId = setInterval(countDown, 1000)
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameSpeed)
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++
                state.view.score.textContent = state.values.result
                square.classList.remove("enemmy")
                square.classList.add("enemmy-two")
                state.values.hitPosition = null
                playSound("hit")                
            }
        })
    })
}

function main() {
    moveEnemy()
    startTimer()
    addListenerHitBox()
}

function startGame() {
    state.view.modal.classList.remove("open")
    main()
}

function gameOver() {
    state.view.playAgain.classList.add("open")
    if (state.values.result >= 0) {
        state.view.playAgain.querySelector("span").innerText = `${state.values.result} pontos`

        state.view.restartButton.addEventListener("click", restartGame)
    }
}

function restartGame() {
    state.view.playAgain.classList.remove("open")
    state.values.timerId = null
    state.values.gameSpeed = 1000
    state.values.hitPosition = 0
    state.values.result = 0 
    state.values.currentTime = 30
    state.view.timeLeft.textContent = 30
    state.actions.countDownTimerId = null
    state.view.score.textContent = 0
    state.view.squares.forEach((square) => {
    square.classList.remove("enemmy")
    square.classList.remove("enemmy-two")
    })
    state.view.modal.classList.add("open")
}