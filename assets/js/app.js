const $dice = document.getElementById('dice'),
  $btnHold = document.querySelector('.btn--hold'),
  $btnNew = document.querySelector('.btn--new'),
  $btnRoll = document.querySelector('.btn--roll'),
  $player1 = document.querySelector('.player--1'),
  $player0 = document.querySelector('.player--0'),
  $currentScore = document.querySelectorAll('.current-score'),
  $scores = document.querySelectorAll('.score');

let activePlayer, currentScore, scores, isPlaying;

function displayCurrentScore(score) {
  currentScore += score;
  const $player = document.getElementById(`current--${activePlayer}`);
  $player.textContent = currentScore;
}

function switchActivePlayer() {
  const $player = document.getElementById(`current--${activePlayer}`);
  activePlayer = activePlayer ? 0 : 1;
  currentScore = 0;
  $player.textContent = 0;
  $dice.classList.add('hidden');
  $player0.classList.toggle('active-player');
  $player1.classList.toggle('active-player');
}

function lauchRollDice() {
  if (isPlaying) {
    $dice.classList.remove('hidden');
    const random = Math.floor(Math.random() * 6 + 1);
    const $diceImg = `./assets/img/dice-${random}.png`;
    $dice.src = $diceImg;

    if (random !== 1) {
      displayCurrentScore(random);
    } else {
      switchActivePlayer();
    }
  }
}

function saveScore() {
  if (isPlaying) {
    const $playerScore = document.querySelector(`.score--${activePlayer}`);
    const score = (scores[activePlayer] += currentScore);
    $playerScore.textContent = score;
    if (score >= 20) {
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('is-winner');
    }
    switchActivePlayer();
  }
}

function init() {
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  isPlaying = true;
  $currentScore.forEach(el => (el.textContent = 0));
  $scores.forEach(el => (el.textContent = 0));
  $player0.classList.remove('is-winner');
  $player1.classList.remove('is-winner');
  $player1.classList.remove('active-player');
  $player0.classList.add('active-player');
}
init();
$btnRoll.addEventListener('click', lauchRollDice);
$btnHold.addEventListener('click', saveScore);
$btnNew.addEventListener('click', init);
