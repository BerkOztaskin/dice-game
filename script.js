'use strict';

const player1El = document.querySelector('.player--1');
const player2El = document.querySelector('.player--2');

const score1_Element = document.querySelector('#score--1');
const score2_Element = document.getElementById('score--2');
const currentScore_1 = document.querySelector('#current--1');
const currentScore_2 = document.querySelector('#current--2');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

let score, currentScore, activePlayer, playing;
const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 1; //& player1
  playing = true;

  score1_Element.textContent = 0;
  score2_Element.textContent = 0;
  diceEl.classList.add('hidden');
  if (
    document.querySelector('.player--1').classList.contains('player--winner') ||
    document.querySelector('.player--2').classList.contains('player--winner')
  ) {
    document.querySelector(`.player--1`).classList.remove('player--winner');
    document.querySelector(`.player--2`).classList.remove('player--winner');
  }
  if (!diceEl.classList.contains('hidden')) {
    diceEl.classList.add('hidden');
  }

  if (!player1El.classList.contains('player--active')) {
    player1El.classList.toggle('player--active');
    player2El.classList.toggle('player--active');
  }

  document.getElementById('score--1').textContent = 0;
  document.getElementById('score--2').textContent = 0;
};

init();
function swithc_player() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 1 ? 2 : 1;
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function () {
  if (playing) {
    //! Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //! Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice_${dice}.png`;

    //! Check for  rolled 1:if true, switch to next player
    if (dice !== 1) {
      //! Add dice number to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //! Switch to enxt player
      swithc_player();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    console.log(activePlayer);

    //! Add current score to active player's score
    score[activePlayer - 1] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer - 1];

    //! Check if player's score is >= 100

    if (score[activePlayer - 1] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('active--player');
    }

    //*Finish the game
    //! Switch to the next player
    swithc_player();
  }
});

btnNew.addEventListener('click', init);
