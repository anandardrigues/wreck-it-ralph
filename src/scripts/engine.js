const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    timerId: null,
    gameVelocity: 1000,
    score: 0,
    timeLeft: 30, 
  },
};

function randomSquare() {
  // Remove enemy class from all squares
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  // Select a random square to be the enemy
  const randomNumber = Math.floor(Math.random() * state.view.squares.length);
  const randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add('enemy');
}

function moveEnemy() {
  state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function startTimer() {
  state.view.timeLeft.textContent = state.values.timeLeft; // Display initial time
  const timerId = setInterval(() => {
    state.values.timeLeft--;
    state.view.timeLeft.textContent = state.values.timeLeft; // Update the timer display

    if (state.values.timeLeft <= 0) {
      clearInterval(timerId); // Stop the timer
      clearInterval(state.values.timerId); // Stop moving the enemy
      alert("Game Over! Your score is: " + state.values.score);
    }
  }, 1000); // Decrease time every second
}

function playSound(){
  let audio = new audio ("./src/audios/hit.m4a")
  audio.play
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener('click', () => {
      if (square.classList.contains('enemy')) {
        // Increment score if the enemy square is clicked
        state.values.score++;
        state.view.score.textContent = state.values.score; // Update the score display
        randomSquare(); // Move the enemy to a new square
        playSound();
      }
    });
  });
}

function initialize() {
  addListenerHitBox(); // Set up click listeners on squares
  moveEnemy(); // Start moving the enemy
  startTimer(); // Start the timer
}

initialize();

