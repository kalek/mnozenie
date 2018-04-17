import React, { Component } from 'react';
import './App.css';

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const CARDS = [
  '6x7',
  '7x8',
  '8x8',
  '3x8',
  '4x8',
  '5x8',
  '2x8',
  '5x8',
  '2x9',
  '3x9',
  '4x9',
  '7x6',
  '3x7',
  '5x7',
  '4x7',
];

const initialState = {
  results: [],
  showModal: false,
  correct: null,
  showOk: false,
  showBad: false,
  goodPoints: 0,
  badPoints: 0,
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.showModal = this.showModal.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }
  showModal(index) {
    const numbers = CARDS[index].split('x');
    const correct = numbers[0] * numbers[1];
    const tmp1 = correct + parseInt(Math.random(1) * 20 + 1);
    const tmp2 = correct + parseInt(Math.random(1) * 20 + 1);
    this.setState({
      showModal: true,
      results: shuffle([correct , tmp1, tmp2]),
      correct,
    })
  }
  checkAnswer(number) {
    const { correct, goodPoints, badPoints } = this.state;
    if (correct === number) {
      this.setState({
        showOk: true,
        showModal: false,
        goodPoints: goodPoints + 1,
      });
      setTimeout(() => {
        this.setState({
          showOk: false,
        });
      }, 1500);
    } else {
      this.setState({
        showBad: true,
        showModal: false,
        badPoints: badPoints + 1,
      });
      setTimeout(() => {
        this.setState({
          showBad: false,
        });
      }, 1500);
    }
  }
  render() {
    const { results, showModal, showOk, showBad, goodPoints, badPoints } = this.state;
    return (
      <div className="App">
        {CARDS.map((card, index) => {
          const numbers = card.split('x');
          return (
            <div key={index} className="card" onClick={() => this.showModal(index)}>
              <div className="top-left">{numbers[0]}</div>
              <div className="middle">X</div>
              <div className="bottom-right">{numbers[1]}</div>
            </div>
          );
        })}
        {showModal && <div className="modal">
          {results.map((number) => {
            return (
              <div onClick={() => this.checkAnswer(number)}>{number}</div>
            );
          })}
        </div>}
        {showOk && <div className="ok">DOBRZE</div>}
        {showBad && <div className="bad">ŹLE</div>}
        <div className="points">
          <div className="good-points">DOBRZE: <span>{goodPoints}</span></div>
          <div className="bad-points">ŹLE: <span>{badPoints}</span></div>
        </div>
      </div>
    );
  }
}

export default App;
