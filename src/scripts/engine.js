const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemmy: document.querySelector(".enemmy"),
        enemmy2: document.querySelector(".enemmy-two"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        modal: document.querySelector("#modal"),
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
    }
}

const easy = document.querySelector(".easy")
const medium = document.querySelector(".medium")
const hard = document.querySelector(".hard")

easy.addEventListener("click", () => {
    gameDifficulty("easy")
})
medium.addEventListener("click", () => {
    gameDifficulty("medium")
})
hard.addEventListener("click", () => {
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
        // alert(`Game Over! O seu resultado foi:  ${state.values.result}`)
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


